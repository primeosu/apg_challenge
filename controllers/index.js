'use strict';

var parse = require('csv-parse');
var Promise = require('bluebird');
var _ = require('lodash');

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});

var FileDescriptor = require('../models/file');

module.exports = function (app) {

    app.get('/', function (req, res) {
        var error = req.session.error;
        req.session.error = undefined;
        var successMessage = req.session.successMessage;
        req.session.successMessage = undefined;
        FileDescriptor.getTypeCounts().then(function (typeCounts) {
            res.status(error && error.statusCode || 200)
                .render('index', {
                    errorMessage: error && error.message,
                    successMessage: successMessage,
                    typeCounts: typeCounts
                });
        }, function () {
            res.status(500)
                .render('index', {
                    errorMessage: '500 Database Error'
                });
        });
    });

    app.post('/api/v1/file', upload.single('file'), function (req, res) {
        if (!req.file || !req.file.buffer) {
            redirectWithError({
                message: '400 Bad Request',
                statusCode: 400
            }, req, res);
        }
        else {
            parseRawFileDescriptors(req.file.buffer, function (error, rawFileDescriptors) {
                if (error) {
                    redirectWithError(error, req, res);
                }
                else {
                    saveFileDescriptors(createFileDescriptors(rawFileDescriptors), req, res);
                }
            });
        }
    });

    app.all('*', function (req, res) {
        redirectWithError({
            statusCode: 404,
            message: '404 Not Found'
        }, req, res);
    });

    app.use(function (err, req, res, next) {
        res.status(internalServerError().statusCode)
            .render('index', {
                errorMessage: internalServerError().message
            });
    });
};

function redirectWithError(error, req, res) {
    req.session.error = error;
    res.redirect('/');
}

function internalServerError() {
    return {
        statusCode: 500,
        message: '500 Internal Server Error'
    };
}

function parseRawFileDescriptors(buffer, callback) {
    parse(buffer, {}, function (error, output) {
        if (error) {
            callback({
                message: '400 Bad Request',
                statusCode: 400
            });
        }
        else {
            var rawFileDescriptors = _.chain(output)
                .drop()
                .map(function (row) {
                    return _.zipObject(
                        ['MD5', 'ClassificationName', 'ClassificationType', 'Size', 'FileType'],
                        row
                    );
                })
                .value();
            callback(null, rawFileDescriptors);
        }
    });
}

function createFileDescriptors(rawFileDescriptors) {
    return _.map(rawFileDescriptors, function (fileDescriptor) {
        return new FileDescriptor(fileDescriptor);
    });
}

function saveFileDescriptors(fileDescriptors, req, res) {
    Promise.all(_.map(fileDescriptors, function (fileDescriptor) {
            return fileDescriptor.save();
        }))
        .then(function () {
            req.session.successMessage = 'Successfully imported ' + String(fileDescriptors.length) + ' file definitions.';
            res.redirect('/');
        }, function () {
            redirectWithError(internalServerError(), req, res);
        });
}