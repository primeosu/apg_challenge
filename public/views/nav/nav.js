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

