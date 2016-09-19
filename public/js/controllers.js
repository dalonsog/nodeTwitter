'use strict';

angular
  .module('nodeTwitter.controllers', [])
  .controller('mainController', [
    '$scope', 
    'userAPI', 
    function ($scope, userAPI) {
      $scope.tweetText = '';
      $scope.timeline = [];
      $scope.newTweets = [];

      $scope.sendTweet = function () {
        if (!$scope.tweetText.length || $scope.tweetText.length > 140) return;

        var tweet = { text: $scope.tweetText };

        userAPI.postTweet(tweet).success(function () {
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

      $scope.renderNewTweets = function () {
        $scope.timeline = $scope.newTweets.splice(0).concat($scope.timeline);
      }
      
      function _getTimeline (date) {
        var ops = { lastDate: date.toISOString() };

        userAPI.getTimeline(ops).success(function (response) {
          if (!$scope.timeline.length)
            $scope.timeline = response.concat($scope.timeline);
          else
            $scope.newTweets = response.concat($scope.newTweets);

          var lastDate = response.length 
                         ? new Date(response[0].createdAt) 
                         : date;

          setTimeout(_getTimeline.bind(this, lastDate), 5000);
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
