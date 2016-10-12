'use strict';

angular
  .module('nodeTwitter')
  .component('tweet', {
    templateUrl: 'views/tweet.html',
    controller: function () {
      this.tweet.createdAt = Utils.getTimeDiff(this.tweet.createdAt);
    },
    bindings: {
      tweet: '<'
    }
  })
  .component('loader', {
    templateUrl: 'views/loader.html',
    bindings: {
      tweet: '<'
    }
  });
