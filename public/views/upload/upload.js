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
