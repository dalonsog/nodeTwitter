'use strict';

var mongoose = require('mongoose');
var User = require('../models/user');
var Tweet = require('../models/tweet');

module.exports.getTweets = function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.decoded._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.decoded._id)
      .populate({
        path: 'tweets',
        select: '_id text createdAt likes retweets',
        options: { sort: { 'createdAt': -1 } }
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

module.exports.getTimeline = function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.decoded._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.decoded._id)
      .populate({
        path: 'following',
        populate: {
          path: 'tweets',
          select: '_id text createdAt likes retweets',
          options: { sort: { 'createdAt': -1 } }
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

/**
**
**/
module.exports.followUser = function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.decoded._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User.findById(req.decoded._id).exec(function (err, originalUser) {
      if (err) {
        res.status(500).send(err); 
        return;
      }

      User.findById(req.params.userId).exec(function (err, userToFollow) {
        if (err) {
          res.status(500).send(err); 
          return;
        }
        
        var index = originalUser.following.indexOf(req.params.userId);
        if (index === -1) originalUser.following.push(userToFollow);
        
        index = userToFollow.followers.indexOf(req.decoded._id);
        if (index === -1) userToFollow.followers.push(originalUser);

        originalUser.save(function (err) {
          if (err) {
            res.status(500).send(err); 
            return;
          }

          userToFollow.save(function (err) {
            if (err) {
              res.status(500).send(err); 
              return;
            }

            res.status(200).send('ok');
          });
        });
      });
    });
  }
};

/**
**
**/
module.exports.unfollowUser = function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.decoded._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User.findById(req.decoded._id).exec(function (err, originalUser) {
      if (err) {
        res.status(500).send(err); 
        return;
      }

      User.findById(req.params.userId).exec(function (err, userToFollow) {
        if (err) {
          res.status(500).send(err); 
          return;
        }

        var index = originalUser.following.indexOf(req.params.userId);
        if (index !== -1) originalUser.following.splice(index, 1);

        index = userToFollow.followers.indexOf(req.decoded._id);
        if (index !== -1) userToFollow.followers.splice(index, 1);

        originalUser.save(function (err) {
          if (err) {
            res.status(500).send(err); 
            return;
          }

          userToFollow.save(function (err) {
            if (err) {
              res.status(500).send(err); 
              return;
            }
            
            res.status(200).send('ok');
          });
        });
      });
    });
  }
};
