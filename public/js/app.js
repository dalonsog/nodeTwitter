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
            'sidebar': { templateUrl: 'views/sidebar.html' },
            'timeline': { templateUrl: 'views/timeline.html' }
          }
        });
      
      $urlRouterProvider.otherwise('/');
    }
  ]);
