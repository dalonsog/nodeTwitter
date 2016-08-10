"use strict";

var app = require('./app');
var db = require('./config/db');
var mongoose = require('mongoose');

connectToDatabase()
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', function () {
    console.log("Connected correctly to database server");
    listen();
  });

/**
** Establishes connection to the database
**
** @return: mongoose connection object
**/ 
function connectToDatabase() {
  return mongoose.connect(db.url).connection;
}

/**
** Starts listening
**/
function listen() {
  var port = process.env.PORT || 8080;
  app.listen(port, function () {
    console.log("Listening on port: " + port);
  });
}
