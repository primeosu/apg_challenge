(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{"./views/database/database.js":3,"./views/header/header.js":4,"./views/nav/nav.js":5,"./views/upload/upload.js":6}],2:[function(require,module,exports){
/**
 * public/utils/request.js
 *
 * @description: Fetch wrapper class with automatic error handling
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: July 14th 2015
 */

/**
 * Request()
 * @description: Creates a new Request object and makes an ajax request
 * @param: {Object} options
 */
function Request(options) {
  _.extend(this, options);

  this.fetch();
}

/**
 * fetch()
 * @description: Makes an ajax request using fetch
 */
Request.prototype.fetch = function () {
  var that = this;

  /**
   * checkStatus()
   * @description: Breaks the promise chain if response is non-200
   * @param: {Object} response
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300)
      return response;

    throw {
      statusText: response.statusText,
      response: response
    };
  }

  fetch(this.url, {
    method: this.method || 'get',
    headers: this.headers,
    body: this.body
  }).then(checkStatus)
    .then(function (response) {
      if (response.status === 204)
        return;

      if (response.headers.get('Content-Type') === 'application/json')
        return response.json();
        
      return response.text();
    }).then(function (body) {
      return that.callback(null, body);
    }).catch(function (error) {
      if (error.response && error.response.status === 204)
        return that.callback();

      return that.callback(error);
    });
};

module.exports = Request;

},{}],3:[function(require,module,exports){
/**
 * /public/views/database/database.js
 *
 * @description: Database view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

module.exports = Backbone.View.extend({

  /**
   * initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    new Request({
      url: 'views/database/database.tmpl',
      callback: function (error, body) {
        if (!error)
          that.template = _.template(body);

        that.render();
      }
    });
  },

  /**
   * render()
   * @description: Draws the view
   */
  render: function () {
    if (!this.template)
      return this.$el.html(_.template($('#error-template').html())());

    this.$el.html(this.template());
  }

});


},{"../../utils/request.js":2}],4:[function(require,module,exports){
/**
 * /public/views/header/header.js
 *
 * @description: Header view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

module.exports = Backbone.View.extend({

  /**
   * initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    new Request({
      url: 'views/header/header.tmpl',
      callback: function (error, body) {
        if (error)
          return that.callback(error);

        that.template = _.template(body);
        that.render();
        that.$el.removeClass('hidden');

        return that.callback();
      }
    });
  },

  /**
   * render()
   * @description: Draws the view
   */
  render: function () {
    this.$el.html(this.template());

    $('#content-wrapper').css('height', 'calc(100% - ' + this.$el.height() + 'px)');
  }

});


},{"../../utils/request.js":2}],5:[function(require,module,exports){
/**
 * /public/views/nav.js
 *
 * @description: Navigation view
 * @author: Chris Young (cyoung@mobiquityinc.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

module.exports = Backbone.View.extend({

  /**
   * initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    new Request({
      url: 'views/nav/nav.tmpl',
      callback: function (error, body) {
        if (error)
          return options.callback(error); 

        that.template = _.template(body);
        that.render();
        that.$el.removeClass('hidden');
        that.listenTo(that.router, 'route', that.setActive);

        return options.callback();
      }
    });
  },

  /**
   * render()
   * @description: Draws the view
   */
  render: function () {
    this.$el.html(this.template());

    this.toggleNav();
    this.setActive();
  },

  /**
   * events
   * @description: Declares click events
   */
  events: {
    'click #nav-toggle': 'toggleNav',
  },

  /**
   * toggleNav()
   * @description: Collpases and expands the navigation view to increase main content width
   * @param: {Object} event
   */
  toggleNav: function (event) {
    if (event) {
      event.preventDefault();
      this.collapsed = !this.collapsed; 
    }

    if (this.collapsed) {
      this.$el.removeClass('nav-expanded').addClass('nav-collapsed');
      $('#nav [data-toggle="tooltip"]').tooltip();
    } else {
      $('#nav [data-toggle="tooltip"]').tooltip('destroy');
      this.$el.removeClass('nav-collapsed').addClass('nav-expanded');
    }
  },

  /**
   * setActive()
   * @description: Highlights the current navigation item
   */
  setActive: function () {
    var $a = $('#nav a[href="' + window.location.hash + '"]');

    $('#nav li').removeClass('active');

    if ($a.hasClass('nav-sub-level'))
      $a.parent().parent().parent().addClass('active').addClass('expanded');

    $a.parent().addClass('active');
  }

});


},{"../../utils/request.js":2}],6:[function(require,module,exports){
/**
 * /public/views/upload/upload.js
 *
 * @description: Upload view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

module.exports = Backbone.View.extend({

  /**
   * initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    new Request({
      url: 'views/upload/upload.tmpl',
      callback: function (error, body) {
        if (!error)
          that.template = _.template(body);

        that.render();
      }
    });
  },

  /**
   * render()
   * @description: Draws the view
   */
  render: function () {
    if (!this.template)
      return this.$el.html(_.template($('#error-template').html())());

    this.$el.html(this.template());
  }

});

},{"../../utils/request.js":2}]},{},[1])


//# sourceMappingURL=bundle.js.map