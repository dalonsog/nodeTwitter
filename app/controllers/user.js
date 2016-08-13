'use strict';

var mongoose = require('mongoose');
var User = require('../models/user');
var Tweet = require('../models/tweet');

module.exports.getTweets = function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .populate({
        path: 'tweets',
        select: '_id text createdAt likes retweets'
      })
      .exec(function (err, user) {
        if (err) {
          throw err;
          res.status(500);
        }

        res.status(200).json(user.tweets);
      });
  }
};

module.exports.getFollowingTweets = function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .populate({
        path: 'following',
        populate: {
          path: 'tweets',
          select: '_id text createdAt likes retweets',
        }
      })
      .exec(function (err, user) {
        if (err) {
          throw err;
          res.status(500);
        }

        var tweets = [];

        user.following.forEach(following => {
          tweets = tweets.concat(following.tweets);
        });

        res.status(200).json(tweets);
      });
  }
};
