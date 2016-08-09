'use strict';

var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

// Import routes
var router = require('./routes/index');

// DB config
mongoose.connect('mongodb://localhost:27017/nodetwitter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected correctly to server");
});

var app = express();

// Logger
app.use(morgan('dev'));

// Routes
app.use('/', router);

module.exports = app;
