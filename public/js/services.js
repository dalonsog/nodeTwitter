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
        return $http.get('/users/57b03cf99b4b16b4184fb8c6/tweets');
      };
  
      userAPI.postTweet = function (tweet) {
        return $http.post('/tweets', tweet);
      };
  
      return userAPI;
    }
  ]);
