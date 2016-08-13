'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();
var jwt = require('express-jwt');
var profileController = require('../controllers/profile');
var authController = require('../controllers/authentication');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.get('/profile', auth, profileController.profileRead);

router.get('/register', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../public/views/register.html'));
});
router.post('/register', authController.register);

router.get('/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../public/views/login.html'));
});
router.post('/login', authController.login);


router.post('/ping', function (req, res, next) {
  res.status(200).json(req.body);
});

module.exports = router;
