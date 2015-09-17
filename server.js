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

let malware = require(`${__dirname}/controllers/malware`);

let app = express(),
    port = 8421;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @description: Assigns all requests a unique id for logging
 */
app.use((request, response, next) => {
  request.id = uuid.v4();
  console.log(`* new request: [${request.id}] ${request.method} ${request.url}`);
  next();
});

/**
 * GET /
 * @description: Serves the front-end app files.
 */
app.get(`/`, (request, response) => {
  console.log(`* [${request.id}] successfully served app files`);
  response.sendFile(`${__dirname}/public/app.html`);
});

/**
 * POST /malware
 * @description: Creates a new malware entry in the database.
 */
app.post(`/malware`, malware.create);

/**
 * GET /malware
 * @description: Serves a list of all malware in the database.
 */
app.get(`/malware`, malware.read);

let server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

