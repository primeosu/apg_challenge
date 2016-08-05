'use strict';

var knex = require('./knex.js');
var _ = require('lodash');

var FileClassificationTypes = {
    clean: 'Clean',
    pup: 'PUP',
    trojan: 'Trojan',
    unknown: 'Unknown',
    virus: 'Virus'
};

module.exports = {
    up: function () {
        return knex.schema.createTableIfNotExists('files', function (table) {
            table.string('MD5');
            table.string('ClassificationName');
            table.enu('ClassificationType', _.keys(FileClassificationTypes));
            table.integer('Size');
            table.string('FileType');
            table.increments('id').primary();
        });
    },
    down: function () {
        return knex.schema.dropTableIfExists('files')
    },
    FileClassificationTypes: FileClassificationTypes
};