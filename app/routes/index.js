'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();
var profileController = require('../controllers/profile');
var authController = require('../controllers/authentication');

// Index route
router.get('/', authController.verifyUser, function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../public/views/index.html'));
});

// Profile route
router.get('/profile', authController.verifyUser, profileController.profileRead);

// Registration routes
router.get('/register', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../public/views/register.html'));
});
router.post('/register', authController.register);

// Login routes
router.get('/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../public/views/login.html'));
});
router.post('/login', authController.login);

// Login routes
router.get('/logout', authController.logout);

// Ping route for testing
router.post('/ping', function (req, res, next) {
  res.status(200).json(req.body);
});

// Exposes the router
module.exports = router;
