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
      Upload = require('./views/upload/upload.js');

  var App = Backbone.Router.extend({

    /**
     * initialize()
     * @description: Sets up the application
     */
    initialize: function () {
      var that = this;

      this.views = {};

      Backbone.history.start();

      async.series([function (callback) {
        that.header = new Header({
          el: $('#header'),
          callback: callback
        });
      }, function (callback) {
        that.nav = new Nav({
          el: $('#nav'),
          callback: callback
        });
      }], function (error) {
        if (error)
          $('#content').html(ERROR_TEMPLATE());

        $('#content-wrapper').removeClass('hidden');
        $('#content-wrapper').height($('#content-wrapper').height() - $('#header').height());
      });
    },

    /**
     * routes
     * @description: Declares app view routing
     */
    routes: {
      '': 'redirectToDatabase',
      'database': 'database',
      'upload': 'upload'
    },

    redirectToDatabase: function () {
      window.location.replace('#/database');
    },

    database: function () {
      if (!this.views.database)
        this.views.database = new Database({
          el: $('#content')
        });
      else
        this.views.database.render();
    },

    upload: function () {
      if (!this.views.upload)
        this.views.upload = new Upload({
          el: $('#content')
        });
      else
        this.views.upload.render();
    }

  });

  var app = new App();

})();

