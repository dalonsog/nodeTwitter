'use strict';

angular
  .module('nodeTwitter.services', [])
  .factory('userAPI', [
    '$http',
    function ($http) {
      var userAPI = {}
  
      userAPI.getDetail = function () {
        return $http.get('/profile');
      };

      userAPI.getUsers = function () {
        return $http.get('/users');
      };

      userAPI.getUser = function (user) {
        return $http.get('/users/' + user._id);
      };
  
      userAPI.getTimeline = function () {
        return $http.get('/timeline');
      };

      userAPI.followUser = function (user) {
        return $http.post('/users/' + user._id + '/follow');
      };

      userAPI.unfollowUser = function (user) {
        return $http.delete('/users/' + user._id + '/follow');
      };
  
      userAPI.postTweet = function (tweet) {
        return $http.post('/tweets', tweet);
      };
  
      return userAPI;
    }
  ]);
