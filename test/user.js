'use strict';

var assert = require('assert');
var User = require('../app/models/user');

describe('User', function () {
  const NAME = 'Name',
        EMAIL = 'email@domain.com',
        PASSWORD = 'pwd12345';
  
  describe('new User()', function () {
    it('should be created properly', function () {
      var user = new User({
        name: NAME,
        email: EMAIL
      });

      assert.ok(user._id);
    });

    it('should have a correct name', function () {
      var user = new User({
        name: NAME,
        email: EMAIL
      });

      assert.equal(user.name, NAME);
    });

    it('should have a correct email', function () {
      var user = new User({
        name: NAME,
        email: EMAIL
      });

      assert.equal(user.name, NAME);
    });
  });

  describe('.setPassword()', function () {
    var user = new User({
      name: NAME,
      email: EMAIL
    });

    it('should have set a correct hash and salt', function () {
      user.setPassword(PASSWORD);

      assert.ok(user.hash);
      assert.ok(user.salt);
    });
  });

  describe('.validPassword()', function () {
    var user = new User({
      name: NAME,
      email: EMAIL
    });

    user.setPassword(PASSWORD);

    it('should return true given a valid password', function () {
      assert.ok(user.validPassword(PASSWORD));
    });

    it('should return false given a wrong password', function () {
      assert.ok(!user.validPassword('PASSWORD'));
    });
  });

  describe('.generateJwt()', function () {
    var user = new User({
      name: NAME,
      email: EMAIL
    });

    user.setPassword(PASSWORD);

    it('should return a valid jsonwebtoken', function () {
      assert.ok(user.generateJwt());
    });
  });
});
