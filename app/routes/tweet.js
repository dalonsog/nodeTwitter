'use strict';

var express = require('express');
var tweetController = require('../controllers/tweet');
var router = express.Router();
var authController = require('../controllers/authentication');

router.post('/', authController.verifyUser, tweetController.tweet);

module.exports = router;
