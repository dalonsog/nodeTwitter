'use strict';

var mongoose = require('mongoose');
var User = require('../models/user');
var Tweet = require('../models/tweet');

module.exports.tweet = function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id, function (err, user) {
        if (err) {
          throw err;
          res.status(500);
        }

        _createTweet(req.body, user)
          .then(function (tweet) {
            user.tweets.push(tweet);
            
            user.save(function (err) {
              if (err) {
                throw err;
                res.status(500);
              }

              res.status(200).json({ tweetId: tweet._id });
            });
          })
          .catch(function (err) {
            throw err;
            res.status(500);   
          });
      });
  }
};

/**
**
**/
function _createTweet(tweetData, author) {
  var promise = new Promise(function (resolve, reject) {
    var tweet = new Tweet();
      
    tweet.text = tweetData.text;
    tweet.author = author;
    
    tweet.save(function (err) {
      if (err) reject(err);

      resolve(tweet);
    });
  });

  return promise;
}
