'use strict';

function userPopupController ($scope, userAPI) {
  $scope.showUser = false;
  $scope.userPopup = {};

  $scope.toggleShowUser = function () {
    var user = this.$parent.$parent.tweet.author;

    userAPI.getUser(user).success(function (response) {
      $scope.userPopup = response;
      $scope.showUser = true;
    });
  };
}