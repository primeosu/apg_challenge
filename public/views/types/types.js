/**
 * /public/views/types/types.js
 *
 * @description: Database view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

var Types = require('../../collections/types.js');

module.exports = Backbone.View.extend({

  /**
   * Types.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    this.types = new Types();

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

    if (!this.types.length) {
      this.$el.html(this.loadingTemplate());
    } else {
      this.ui.$pageLoading.removeClass('hidden');
    }

    this.types.on('error sync', function (error) {
      if (event.type === 'error') {
        return that.$el.html(that.errorTemplate());
      }

      that.$el.html(that.template({ types: that.types }));
      that.setUiElements();

      that.resize()
      $(window).resize(_.bind(that.resize, that));
    });

    this.types.fetch();
  },

  /**
   * events
   * @description: Declares view click events
   */
  events: {
    'click #types-content a.sort-link': 'sort'
  },

  /**
   * Types.resize()
   * @description: Resizes the table wrapper on window resize
   */
  resize: function () {
    this.ui.$tableWrapper.css('max-height', this.ui.$contentBox.height());
  },

  /**
   * Database.sort()
   * @description: Reorders the collection based on sort method
   */
  sort: function (event) {
    var $target = $(event.target).parents('a.sort-link');

    event.preventDefault();

    this.types.sortMethod.key = $target.data('key');
    this.types.sortMethod.direction = $target.find('span.sort-icon').hasClass('fa-sort-down') ? 1 : -1;
    this.types.sort();

    this.render();
  }

});

