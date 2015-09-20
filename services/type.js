/**
 * /services/type.js
 *
 * @description: Type service layer
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

let knex = require('knex'),
    uuid = require('node-uuid'),
    _ = require('underscore');

let database = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: process.env.APG_USER,
    password: process.env.APG_PASS,
    database: 'apg_challenge'
  }
});

/**
 * Type.create()
 * @description: Creates a new type entry in the database
 * @param: {String} requestId
 * @param: {String} classificationType
 * @param: {Function} callback
 */
exports.create = (requestId, classificationType, callback) => {
  let type = {
    typeId: uuid.v4(),
    classificationType: classificationType,
    amount: 1
  };

  database.insert(type).into('type').then(() => {
    return database.select().from('type').where({ typeId: type.typeId });
  }).then((rows) => {
    return callback(null, rows[0]);
  }).catch((error) => {
    console.log(`* [${requestId}] Failed to persist type to the database`, error);
    return callback(500, type.classificationName);
  });
};

/**
 * Type.read()
 * @description: Fetches a type by classificationName
 * @param: {String} requestId
 * @param: {String} classificationType
 * @param: {Function} callback
 */
exports.read = (requestId, classificationType, callback) => {
  database.select().from('type').where({ classificationType: classificationType }).then((rows) => {
    return callback(null, rows[0]);
  }).catch((error) => {
    console.log(`* [${requestId}] Failed to read type from database`, error);
    return callback(500);
  });
};

/**
 * Type.readAll()
 * @description: Fetches all type entries from the database
 * @param: {String} requestId
 * @param: {Function} callback
 */
exports.readAll = (requestId, callback) => {
  database.select().from('type').then((rows) => {
    return callback(null, rows);
  }).catch((error) => {
    console.log(`* [${requestId}] Failed to read types from the database`, error);
    return callback(500);
  });
};

/**
 * Type.update()
 * @description: Updates the type's amount
 * @param: {String} requestId
 * @param: {String} typeId
 * @param: {Number} amount
 * @param: {Function} callback
 */
exports.update = (requestId, typeId, amount, callback) => {
  database.table('type').update({ amount: amount }).where({ typeId: typeId }).then(() => {
    return callback();
  }).catch((error) => {
    console.log(`* [${requestId}] Failed to update type`, error);
    return callback(500);
  });
};

