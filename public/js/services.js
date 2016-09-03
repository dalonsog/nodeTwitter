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
  
      userAPI.getTimeline = function () {
        return $http.get('/users');
      };
  
      userAPI.postTweet = function (tweet) {
        return $http.post('/tweets', tweet);
      };
  
      return userAPI;
    }
  ]);
