'use strict';

function UserAPI ($http) {
  var userAPI = {};
    
  userAPI.getDetail = () => $http.get('/profile');

  userAPI.getUsers = () => $http.get('/users');

  userAPI.getUser = user => $http.get('/users/' + user._id);

  userAPI.getTimeline = options => $http.post('/timeline', options);

  userAPI.followUser = user => $http.post('/users/' + user._id + '/follow');

  userAPI.unfollowUser = user => $http.delete('/users/' + user._id + '/follow');

  userAPI.postTweet = tweet => $http.post('/tweets', tweet);
  
  return userAPI;
}

angular
  .module('nodeTwitter.services', [])
  .factory('userAPI', [
    '$http',
    function ($http) {
      return UserAPI($http);
    }
  ]);
