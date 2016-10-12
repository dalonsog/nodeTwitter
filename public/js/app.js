'use strict';

angular
  .module('nodeTwitter', [
    'monospaced.elastic',
    'nodeTwitter.services',
    'nodeTwitter.controllers',
    'ui.router', 
    'ngResource'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('app', {
          url:'/',
          views: {
            'sidebar': { templateUrl: 'views/sidebar.html' },
            'timeline': { templateUrl: 'views/timeline.html' }
          }
        })
        .state('app.notifications', {
          url:'notifications',
          views: {
            'timeline@': { templateUrl: 'views/notifications.html' }
          }
        });
      
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode({ enabled: true, requireBase: false });
    }
  ]);
