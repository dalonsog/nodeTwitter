'use strict';

var mongoose = require('mongoose');
var User = require('../models/user');
var Tweet = require('../models/tweet');

module.exports.getUsers = function (req, res) {
  User
    .find({})
    .select({ name: 1, screenname: 1, avatar: 1 })
    .exec(function (err, users) {
      if (err) {
        res.status(500);
        return;
      }

      res.status(200).json(users);
    });
};

module.exports.getUser = function (req, res) {
  User
    .findById(req.params.userId)
    .exec(function (err, user) {
      res.status(200).json(user.getBasicDetails());
    });
};

module.exports.getTweets = function (req, res) {
  User
    .findById(req.params.userId)
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
};

module.exports.getTimeline = function (req, res) {
  User
    .findById(req.decoded._id)
    .select({ tweets: 1, following: 1 })
    .populate([{
      path: 'following',
      select: 'tweets',
      populate: {
        path: 'tweets',
        select: 'author text createdAt likes retweets',
        populate: {
          path: 'author',
          select: 'name screenname avatar'
        }
      }
    }, {
      path: 'tweets', 
      select: 'author text createdAt likes retweets',
      populate: {
        path: 'author',
        select: 'name screenname avatar'
      }
    }])
    .exec(function (err, user) {
      if (err) {
        res.status(500).json(err);
        return;
      }

      var tweets = user.tweets.slice(0);

      user.following.forEach(following => {
        tweets = tweets.concat(following.tweets);
      });

      tweets.sort((a, b) => 
        (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
      );

      res.status(200).json(tweets);
    });
};

/**
**
**/
module.exports.followUser = function (req, res) {
  _followHandler(req.decoded._id, req.params.userId, 'follow')
    .then(function () {
      res.status(200).send('ok');
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
};

/**
**
**/
module.exports.unfollowUser = function (req, res) {
  _followHandler(req.decoded._id, req.params.userId, 'unfollow')
    .then(function () {
      res.status(200).send('ok');
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
};

function _followHandler (followerId, followedId, action) {
  return new Promise(function (resolve, reject) {
    User.findById(followerId).exec(function (err, follower) {
      if (err) {
        reject(err);
        return;
      }

      User.findById(followedId).exec(function (err, followed) {
        if (err) {
          reject(err);
          return;
        }
        
        if (action === 'follow') _follow(follower, followed);
        else _unfollow(follower, followed);

        follower.save(function (err) {
          if (err) {
            reject(err);
            return;
          }

          followed.save(function (err) {
            if (err) {
              reject(err);
              return;
            }

            resolve();
          });
        });
      });
    });
  });
}

function _follow (follower, followed) {
  var index = follower.following.indexOf(followed._id);
  if (index === -1) follower.following.push(followed);
  
  index = followed.followers.indexOf(follower._id);
  if (index === -1) followed.followers.push(follower);
}

function _unfollow (follower, followed) {
  var index = follower.following.indexOf(followed._id);
  if (index !== -1) follower.following.splice(index, 1);

  index = followed.followers.indexOf(follower._id);
  if (index !== -1) followed.followers.splice(index, 1);  
}
