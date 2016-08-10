'use strict';

var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

// Import routes
var router = require('./routes/index');

// Express app instance
var app = express();

// Logger
app.use(morgan('dev'));

// Static
app.use('/', express.static('public/views'));
app.use('/js', express.static('public/js'));

// Routes
app.use('/', router);

module.exports = app;
