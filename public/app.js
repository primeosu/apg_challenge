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
      Malware = require('./views/malware/malware.js'),
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
      this.ui = {
        $body: $('body'),
        $header: $('#header'),
        $nav: $('#nav'),
        $content: $('#content'),
        $contentWrapper: $('#content-wrapper'),
        $errorTemplate: $('#error-template'),
        $loadingTemplate: $('#loading-template')
      };

      this.errorTemplate = _.template(this.ui.$errorTemplate.html());

      Backbone.history.start();

      async.series([function (callback) {
        that.header = new Header({
          parent: that,
          el: that.ui.$header,
          callback: callback
        });
      }, function (callback) {
        that.nav = new Nav({
          parent: that,
          el: that.ui.$nav,
          callback: callback,
          router: that
        });
      }], function (error) {
        if (error) {
          that.ui.$content.html(this.errorTemplate());
        }

        that.ui.$contentWrapper.removeClass('hidden');
        that.ui.$contentWrapper.height(that.ui.$contentWrapper.height() - that.ui.$header.height());
        
        $(window).resize(_.bind(that.resize, that));
      });
    },

    /**
     * App.resize()
     * @description: Vertically resizes content on window resize
     */
    resize: function () {
      this.ui.$contentWrapper.height(this.ui.$body.height() - this.ui.$header.height());
    },

    /**
     * App.routes
     * @description: Declares app view routing
     */
    routes: {
      '': 'redirectToUpload',
      'malware': 'malware',
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
     * App.malware()
     * @description: Creates the malware view or renders it if it already exists
     */
    malware: function () {
      if (!this.views.malware) {
        this.views.malware = new Malware({
          parent: this,
          el: this.ui.$content
        });
      } else {
        this.views.malware.render();
      }
    },

    /**
     * App.upload()
     * @description: Creates the upload view or renders it if it already exists
     */
    upload: function () {
      if (!this.views.upload) {
        this.views.upload = new Upload({
          parent: this,
          el: this.ui.$content
        });
      } else {
        this.views.upload.render();
      }
    },

    /**
     * App.types()
     * @description: Creates the types view or renders it if it already exists
     */
    types: function () {
      if (!this.views.types) {
        this.views.types = new Types({
          parent: this,
          el: this.ui.$content
        });
      } else {
        this.views.types.render();
      }
    }

  });

  var app = new App();

})();

