'use strict';

angular
  .module('nodeTwitter.controllers', [])
  
  .controller('basicDetailController', [
    '$scope', 
    'userAPI', 
    function ($scope, userAPI) {
      userAPI.getDetail().success(function (response) {
        $scope.basicDetail = response;
      });
    }
  ])

  .controller('timelineController', [
    '$scope',
    'userAPI',
    function ($scope, userAPI) {
      $scope.sendTweet = function () {
        var tweet = {}
  
        tweet.text = $scope.tweetText;
  
        userAPI.postTweet(tweet);
      };
  
      userAPI.getTimeline().success(function (response) {
        $scope.timeline = response;
      });    
    }
  ])

  .directive('contenteditable', [
    '$sce', 
    function($sce) {
      return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
          if (!ngModel) return; // do nothing if no ng-model

          // Specify how UI should be updated
          ngModel.$render = function() {
            element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
          };

          // Listen for change events to enable binding
          element.on('blur keyup change', function() {
            scope.$evalAsync(read);
          });
          read(); // initialize

          // Write data to the model
          function read() {
            var html = element.html();
            // When we clear the content editable the browser leaves a <br> behind
            // If strip-br attribute is provided then we strip this out
            if ( attrs.stripBr && html == '<br>' ) {
              html = '';
            }
            ngModel.$setViewValue(html);
          }
        }
      };
    }
  ]);
