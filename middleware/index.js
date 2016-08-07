'use strict';

var path = require('path');
var serveStatic = require('serve-static');
var cookieSession = require('cookie-session');
var env = require('../env.json');

module.exports = function (app) {
    app.use(serveStatic(path.resolve(__dirname, '../public')));
    app.use(cookieSession({
        secret: env.secret
    }));
};