'use strict';

var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.profileRead = function (req, res) {
  // Otherwise continue
  User
    .findById(req.decoded._id)
    .exec(function (err, user) {
      res.status(200).json(user.getBasicDetails());
    });
};
