'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// Schema definition
var User = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  screenname: { type: String, required: false },
  avatar: { type: String, required: false },
  hash: String,
  salt: String
});

/**
** Sets the password for the User instance
**
** @password: password to be to be setted for the User
**/
User.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/**
** Checks wether a given password is valid for the User
**
** @password: password to be checked
**
** @return: wether the password is valid
**/
User.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  
  return this.hash === hash;
};

/**
**
**/
User.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, 'MY_SECRET');
};

// Exposes the Schema as a Mongoose model
module.exports = mongoose.model('User', User);
