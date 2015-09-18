/**
 * /public/app.js
 *
 * @description: Main frontend script
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: Septemeber 17th 2015
 */

(function () {

  'use strict';

  var Header = require('./views/header/header.js'),
      Nav = require('./views/nav/nav.js'),
      Database = require('./views/database/database.js'),
      Upload = require('./views/upload/upload.js'),
      Types = require('./views/types/types.js');

  var App = Backbone.Router.extend({

    /**
     * App.initialize()
     * @description: Sets up the application
     */
    initialize: function () {
      var that = this;

      this.views = {};
      this.errorTemplate = _.template($('#error-template').html());

      Backbone.history.start();

      async.series([function (callback) {
        that.header = new Header({
          el: $('#header'),
          callback: callback
        });
      }, function (callback) {
        that.nav = new Nav({
          el: $('#nav'),
          callback: callback,
          router: that
        });
      }], function (error) {
        if (error)
          $('#content').html(this.errorTemplate());

        $('#content-wrapper').removeClass('hidden');
        $('#content-wrapper').height($('#content-wrapper').height() - $('#header').height());
      });
    },

    /**
     * App.routes
     * @description: Declares app view routing
     */
    routes: {
      '': 'redirectToUpload',
      'database': 'database',
      'upload': 'upload',
      'types': 'types'
    },

    /**
     * App.redirectToUpload()
     * @description: Redirect to the upload view when no page is specified
     */
    redirectToUpload: function () {
      window.location.replace('#/upload');
    },

    /**
     * App.database()
     * @description: Creates the database view or renders it if it already exists
     */
    database: function () {
      if (!this.views.database)
        this.views.database = new Database({
          el: $('#content')
        });
      else
        this.views.database.render();
    },

    /**
     * App.upload()
     * @description: Creates the upload view or renders it if it already exists
     */
    upload: function () {
      if (!this.views.upload)
        this.views.upload = new Upload({
          el: $('#content')
        });
      else
        this.views.upload.render();
    },

    /**
     * App.types()
     * @description: Creates the types view or renders it if it already exists
     */
    types: function () {
      if (!this.views.types)
        this.views.types = new Types({
          el: $('#content')
        });
      else
        this.views.types.render();
    }

  });

  var app = new App();

})();

