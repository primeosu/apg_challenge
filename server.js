/**
 * /server.js
 *
 * @description: Main backend script
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th, 2015
 */

let express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require('node-uuid');

let Malware = require(`${__dirname}/controllers/malware`),
    Type = require(`${__dirname}/controllers/type`);

let app = express(),
    port = (process.env.APG_PORT) ? process.env.APG_PORT : 8421;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @description: Assigns all requests a unique id for logging
 */
app.use((request, response, next) => {
  request.id = uuid.v4();
  console.log(`* New request [${request.id}] ${request.method} ${request.url}`);
  next();
});

/**
 * GET /
 * @description: Serves the front-end app files
 */
app.get(`/`, (request, response) => {
  console.log(`* [${request.id}] Successfully served app files`);
  response.sendFile(`${__dirname}/public/app.html`);
});

/**
 * POST /malware
 * @description: Persists multiple malwares to the database
 */
app.post(`/malwares`, Malware.create);

/**
 * GET /malware
 * @description: Serves a list of all malware in the database
 */
app.get(`/malwares`, Malware.readAll);

/**
 * GET /types
 * @description: Serves a list of different types of malware
 */
app.get(`/types`, Type.readAll);

let server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

