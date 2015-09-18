/**
 * /controllers/type.js
 *
 * @decription: Types controller layer
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

let _ = require('underscore'),
    async = require('async');

let Type = require(`${__dirname}/../services/type.js`);

/**
 * Type.readAll()
 * @description: Fetches all types from the database
 * @param: {Object} request
 * @param: {Object} response
 */
exports.readAll = (request, response) => {
  console.log(`* [${request.id}] Request to fetch all types`);

  Type.readAll(request.id, (error, data) => {
    if (error) {
      response.status(error).send(data);
      return console.log(`* [${request.id}] Failed to respond with types`);
    }

    response.status(200).send(data);
    console.log(`* [${request.id}] Successfully respond with types`);
  });
};

