'use strict';

var express = require('express');
var userController = require('../controllers/user');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.get('/', auth, userController.getTweets);
router.get('/tweets', auth, userController.getTimeline);

router.post('/:userId/follow', auth, userController.followUser);
router.delete('/:userId/follow', auth, userController.unfollowUser);

module.exports = router;
