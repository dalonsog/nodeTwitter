'use strict';

var express = require('express');
var userController = require('../controllers/user');
var router = express.Router();
var verify = require('../controllers/authentication').verifyUser;

/**
** GET /users -> list all users
** GET /users/:userId -> basic detail of user with _id = userId
** GET /users/:userId/tweets -> list all tweets from user with _id = userId
** POST /users/:userId/follow -> follow user with _id = userId
** DELETE /users/:userId/follow -> unfollow user with _id = userId
**/

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);
router.get('/:userId/tweets', userController.getTweets);

router.get('/tweets', verify, userController.getTimeline);

router.post('/:userId/follow', verify, userController.followUser);
router.delete('/:userId/follow', verify, userController.unfollowUser);

module.exports = router;
