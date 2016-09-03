'use strict';

var express = require('express');
var userController = require('../controllers/user');
var router = express.Router();
var authController = require('../controllers/authentication');

router.get('/', authController.verifyUser, userController.getTweets);
router.get('/tweets', authController.verifyUser, userController.getTimeline);

router.post('/:userId/follow', authController.verifyUser, userController.followUser);
router.delete('/:userId/follow', authController.verifyUser, userController.unfollowUser);

module.exports = router;
