'use strict';

var path = require('path');
var schema = require('./models/schema');

var env = require('./env.json');
var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

require('./middleware')(app);
require('./controllers')(app);

schema.up()
    .then(listen, function (error) {
        console.error('Failed to initialize database connection:', error.message);
        process.exit();
    });

function listen() {
    app.listen(env.port, function () {
        console.log('Serving app at http://localhost:' + env.port);
    });
}
