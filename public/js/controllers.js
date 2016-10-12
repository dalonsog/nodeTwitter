'use strict';

angular
  .module('nodeTwitter.controllers', [])
  .controller('mainController', ['$scope', 'userAPI', '$state', mainController])
  .controller('userPopupController', ['$scope', 'userAPI', userPopupController])
  .controller('searchController', ['$scope', searchController]);
