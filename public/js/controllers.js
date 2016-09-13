'use strict';

angular
  .module('nodeTwitter.controllers', [])
  
  .controller('mainController', [
    '$scope', 
    'userAPI', 
    function ($scope, userAPI) {
      $scope.tweetText = '';

      $scope.sendTweet = function () {
        if (!$scope.tweetText.length) return;

        var tweet = {}
  
        tweet.text = $scope.tweetText;
        tweet.createdAt = new Date();
        
        userAPI.postTweet(tweet).success(function () {
          $scope.timeline.splice(0, 0, tweet);
          $scope.user.tweets += 1;
          $scope.tweetText = '';
        });
      };

      $scope.follow = function (user) {
        var i = $scope.users.findIndex(e => e._id === user._id);

        if (i === -1) return;

        userAPI.followUser(user).success(function () {
          $scope.users.splice(i, 1);
        });
      };
      
      userAPI.getDetail().success(function (response) {
        $scope.user = response;
        
        userAPI.getUsers().success(function (response) {
          $scope.users = response.filter(e => e._id !== $scope.user.id);
        });
      });
      
      userAPI.getTimeline().success(function (response) {
        $scope.timeline = response;
      });
    }
  ]);
