/**
 * /public/collections/types.js
 *
 * @descrpition: Types collection
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Type = require('../models/type.js');

module.exports = Backbone.Collection.extend({

  model: Type,

  url: 'types',

  /**
   * sortMethod
   * @description: Used by Malwares.comparator() to define how the collection should be sorted
   */
  sortMethod: {
    key: 'classificationType',
    direction: -1
  },

  /**
   * Types.comparator()
   * @description: Used to maintain the collection in a sorted order
   * @param: {Malware} a
   * @param: {Malware} b
   * @returns: {Number}
   */
  comparator: function (a, b) {
    var aAttribute = a.get(this.sortMethod.key),
        bAttribute = b.get(this.sortMethod.key);

    if (aAttribute > bAttribute) {
      return -1 * this.sortMethod.direction;
    }

    if (aAttribute < bAttribute) {
      return 1 * this.sortMethod.direction
    }

    return 0;
  }

});

