'use strict';

var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

/**
**
**/
module.exports.register = function (req, res) {
  var userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  _createUser(userData)
    .then(function (user) {
      var token = user.generateJwt();

      res.cookie('authToken', token, { maxAge: COOKIE_MAX_AGE });
      
      res.redirect('/');
    })
    .catch(function (err) {
      res.status(500);
      res.json({ message: 'Error registering new user' });
    });
};

/**
**
**/
module.exports.login = function (req, res) {
  passport.authenticate('local', function (err, user, info) {
    // If Passport throws/catches an error
    if (err) {
      res.status(500).json(err);
      return;
    }

    // If a user is found
    if (user) {
      var token = user.generateJwt();

      res.cookie('authToken', token, { maxAge: COOKIE_MAX_AGE });
      
      res.redirect('/');
    } else {
      // If user is not found
      res.status(400).json(info);
    }
  })(req, res);
};

/**
**
**/
module.exports.logout = function (req, res) {
  if (req.cookies.authToken) res.clearCookie('authToken');

  res.redirect('/login');
};

/**
**
**/
module.exports.verifyUser = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'] || req.cookies.authToken;

  // decodes token
  if (token)
    // verifies secret and checks exp date
    _verifyToken(token)
      .then(function (decoded) {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      })
      .catch(function (err) {
        // if the token is wrong, redirects to login page
        res.status(403);
        res.redirect('/login');
      });
  else {
    // if no token is provided, redirects to login page
    res.status(403);
    res.redirect('/login');
  }
};

/**
**
**/
function _createUser(userData) {
  var promise = new Promise(function (resolve, reject) {
    var user = new User();

    user.name = userData.name;
    user.screenname = '@' + userData.name;
    user.email = userData.email;
    user.avatar = 'default' + _randomRange(1, 4) + '.jpg';
    user.setPassword(userData.password);
    
    user.save(function (err) {
      if (err) reject(err);

      resolve(user);
    });
  });

  return promise;
}

function _randomRange (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
**
**/
function _verifyToken(token) {
  var promise = new Promise(function (resolve, reject) {
    jwt.verify(token, 'MY_SECRET', function (err, decoded) {
      if (err) reject(err);
      
      resolve(decoded);
    });
  });

  return promise;
}
