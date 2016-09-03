'use strict';

angular
  .module('nodeTwitter', [
    'nodeTwitter.services',
    'nodeTwitter.controllers',
    'ui.router', 
    'ngResource'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('app', {
          url:'/',
          views: {
              'sidebar': { 
                templateUrl: 'views/sidebar-user.html',
                controller: 'basicDetailController'
              },
              'timeline': { 
                templateUrl: 'views/timeline.html',
                controller: 'timelineController'
              }
          }
        });
      
      $urlRouterProvider.otherwise('/');
    }
  ]);
