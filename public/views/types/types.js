/**
 * /public/views/types/types.js
 *
 * @description: Database view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

var Malwares = require('../../collections/malwares.js');

module.exports = Backbone.View.extend({

  /**
   * Types.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    this.malwares = new Malwares();

    this.errorTemplate = _.template($('#error-template').html());
    this.loadingTemplate = _.template($('#loading-template').html());

    new Request({
      url: 'views/types/types.tmpl',
      callback: function (error, body) {
        if (!error)
          that.template = _.template(body);

        that.render();
      }
    });
  },

  /**
   * Types.render()
   * @description: Draws the view
   */
  render: function () {
    var that = this;

    if (!this.template)
      return this.$el.html(this.errorTemplate());

    if (!this.malwares.length)
      this.$el.html(this.loadingTemplate());
    else
      $('#type-page-loading').removeClass('hidden');

    this.malwares.on('sync', function () {
      that.$el.html(that.template({ types: that.malwares.amountOfTypes() }));
    });

    this.malwares.on('error', function (error) {
      that.$el.html(that.errorTemplate());
    });

    this.malwares.fetch();

    this.resize()
    $(window).resize(this.resize);
  },

  /**
   * Types.resize()
   * @description: Resizes the table wrapper on window resize
   */
  resize: function () {
    $('#type-content div.table-wrapper').css('max-height', $('#content > div.box').height() - 195);
  }

});

