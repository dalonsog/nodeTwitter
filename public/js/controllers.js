'use strict';

angular
  .module('nodeTwitter.controllers', [])
  .controller('mainController', [
    '$scope', 
    'userAPI', 
    function ($scope, userAPI) {
      $scope.tweetText = '';
      $scope.timeline = [];

      $scope.sendTweet = function () {
        if (!$scope.tweetText.length || $scope.tweetText.length > 140) return;

        var tweet = {
          text: $scope.tweetText,
          createdAt: new Date(),
          author: $scope.user,
          retweets: [],
          likes: []
        };

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
          $scope.user.following += 1;
        });
      };

      userAPI.getDetail().success(function (response) {
        $scope.user = response;
        
        userAPI.getUsers().success(function (response) {
          $scope.users = response.filter(e => e._id !== $scope.user.id);
        });
      });
      
      function _getTimeline (date) {
        var ops = { lastDate: date.toISOString() };

        userAPI.getTimeline(ops).success(function (response) {
          $scope.timeline = response.concat($scope.timeline);

          //setTimeout(_getTimeline.bind(this, new Date(0)), 5000);
        });
      }

      _getTimeline(new Date(0));
    }
  ])
  .controller('searchController', [
    '$scope',
    function ($scope) {
      $scope.openSearch = function () {
        console.log('hola');
      };
    }
  ]);
