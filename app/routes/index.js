'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var profileController = require('../controllers/profile');
var authController = require('../controllers/authentication');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.get('/profile', auth, profileController.profileRead);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
