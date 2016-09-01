'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Tweet = require('./tweet');

// Schema definition
var User = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  screenname: String,
  avatar: String,
  hash: String,
  salt: String,
  tweets: [{ type: Schema.ObjectId, ref: 'Tweet' }],
  following: [{ type: Schema.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.ObjectId, ref: 'User' }],
  likes: [{ type: Schema.ObjectId, ref: 'Tweet' }]
}, {
    timestamps: true
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

  var expDate = parseInt(expiry.getTime() / 1000);

  var payload = {
    _id: this._id,
    email: this.email,
    name: this.name,
    expDate: expDate
  };

  return jwt.sign(payload, 'MY_SECRET', { expiresIn: expDate });
};

/**
**
**/
User.methods.getBasicDetail = function () {
  return {
    name: this.name,
    screenname: '@' + this.screenname,
    avatar: this.avatar,
    tweets: this.tweets.length,
    followers: this.followers.length,
    following: this.following.length
  };
}

/**
**
**/
User.methods.getTweets = function () {
  return mongoose.model('User', User)
          .findOne({ id: this._id })
          .populate('tweets')
          .exec();
}

// Exposes the Schema as a Mongoose model
module.exports = mongoose.model('User', User);
