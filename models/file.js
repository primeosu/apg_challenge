'use strict';

var bookshelf = require('./bookshelf');
var Promise = require('bluebird');
var _ = require('lodash');
var schema = require('./schema');

var FileDescriptor = bookshelf.Model.extend({
        tableName: 'files'
    }, {
        getTypeCounts: function () {
            return Promise.props(_.mapValues(schema.FileClassificationTypes, function (name, type) {
                return getTypeCount(type)
                    .then(function (count) {
                        return {
                            count: count,
                            name: name,
                            type: type
                        };
                    })
            }));
        }
    });

function getTypeCount(type) {
    return FileDescriptor.where('ClassificationType', type).count();
}

module.exports = FileDescriptor;

