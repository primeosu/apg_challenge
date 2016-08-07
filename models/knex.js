'use strict';

var env = require('./../env.json');
var knex = require('knex')({
    client: 'mysql',
    connection: env.mysql
});

module.exports = knex;