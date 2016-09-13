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
        console.log(user);
      };
      
      userAPI.getDetail().success(function (response) {
        $scope.user = response;
      });

      userAPI.getUsers().success(function (response) {
        $scope.users = response;
      });
      
      userAPI.getTimeline().success(function (response) {
        $scope.timeline = response;
      });
    }
  ]);
