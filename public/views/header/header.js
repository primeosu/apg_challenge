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
   * Header.initialize()
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
   * Header.render()
   * @description: Draws the view
   */
  render: function () {
    this.$el.html(this.template());

    $('#content-wrapper').css('height', 'calc(100% - ' + this.$el.height() + 'px)');
  }

});

