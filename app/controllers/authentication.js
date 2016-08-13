'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');

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
      
      res.status(200);
      res.json({ token: token });
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
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({ "token" : token });
    } else {
      // If user is not found
      res.status(400).json(info);
    }
  })(req, res);
};

/**
**
**/
function _createUser(userData) {
  var promise = new Promise(function (resolve, reject) {
    var user = new User();

    //User.findOne({ email: 'danirhoads@gmail.com' }, function (err, dani) {
      //if (err) reject(err);

      user.name = userData.name;
      user.screenname = userData.name;
      user.email = userData.email;
      user.setPassword(userData.password);
      //user.following.push(dani);
      
      user.save(function (err) {
        if (err) reject(err);

        resolve(user);
      });
      
    //});
      
  });

  return promise;
}
