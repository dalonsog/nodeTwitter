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
  
      userAPI.getTimeline = function () {
        return $http.get('/users/57b03cf99b4b16b4184fb8c6/tweets');
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
