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
  });
