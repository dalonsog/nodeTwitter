'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) return done(err);

      // User not found in the database
      if (!user) return done(null, false, { message: 'User not found' });

      // Wrong password provided
      if (!user.validPassword(password))
        return done(null, false, { message: 'Password is wrong' });

      // Credentials arre correct, returns the User object
      return done(null, user);
    });
  }
));


