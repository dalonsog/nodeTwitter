'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

require('./config/passport');

// Import routes
var router = require('./routes/index');

// Express app instance
var app = express();

// Logger
app.use(logger('dev'));

// Middleware
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// Static
app.use('/', express.static('./public/views'));
app.use('/js', express.static('./public/js'));

// Routes
app.use('/', router);

module.exports = app;