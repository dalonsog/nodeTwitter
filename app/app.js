'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

require('./config/passport');

// Import routes
var router = require('./routes/index');
var tweetRouter = require('./routes/tweet');
var userRouter = require('./routes/user');

// Express app instance
var app = express();

// Logger
app.use(logger('dev'));

// Middleware
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon('./public/images/favicon.ico'));

// Static
app.use('/views', express.static('./public/views'));
app.use('/js', express.static('./dist'));
app.use('/css', express.static('./public/css'));
app.use('/images', express.static('./public/images'));

// Routes
app.use('/', router);
app.use('/tweets', tweetRouter);
app.use('/users', userRouter);

module.exports = app;
