'use strict';

var express = require('express');
var tweetController = require('../controllers/tweet');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.post('/', auth, tweetController.tweet);

module.exports = router;
