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

    this.errorTemplate = _.template(this.parent.ui.$errorTemplate.html());
    this.loadingTemplate = _.template(this.parent.ui.$loadingTemplate.html());

    new Request({
      url: 'views/types/types.tmpl',
      callback: function (error, body) {
        if (!error) {
          that.template = _.template(body);
        }

        that.render();
      }
    });
  },

  /**
   * Types.setUiElements()
   * @description: Gets DOM references for view elements
   */
  setUiElements: function () {
    this.ui = {
      $pageLoading: $('#type-page-loading'),
      $tableWrapper: $('#type-content div.table-wrapper'),
      $contentBox: $('#content div.box')
    };
  },

  /**
   * Types.render()
   * @description: Draws the view
   */
  render: function () {
    var that = this;

    if (!this.template) {
      return this.$el.html(this.errorTemplate());
    }

    if (!this.malwares.length) {
      this.$el.html(this.loadingTemplate());
    } else {
      this.ui.$pageLoading.removeClass('hidden');
    }

    this.malwares.on('error sync', function (error) {
      if (event.type === 'error') {
        return that.$el.html(that.errorTemplate());
      }

      that.$el.html(that.template({ types: that.malwares.amountOfTypes() }));
      that.setUiElements();

      that.resize()
      $(window).resize(this.resize);
    });

    this.malwares.fetch();
  },

  /**
   * Types.resize()
   * @description: Resizes the table wrapper on window resize
   */
  resize: function () {
    this.ui.$tableWrapper.css('max-height', this.ui.$contentBox.height());
  }

});

