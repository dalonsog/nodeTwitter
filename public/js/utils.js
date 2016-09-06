'use strict';

var Utils = (function () {
  var Utils = {};

  Utils.getTimeDiff = function (datetime) {
    var now = new Date();
    var date = new Date(datetime);

    var diff = now.getTime() - date.getTime();

    diff = Math.round(diff / 1000);

    if (diff < 60) return diff + ' s';

    diff = Math.round(diff / 60);

    if (diff < 60) return diff + ' min';

    diff = Math.round(diff / 60);

    if (diff < 24) return diff + ' h';

    if (now.getFullYear() === date.getFullYear()) return this.renderDate(date);

    else return this.renderDate(date, true);
  };

  Utils.renderDate = function (date, renderYear) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    return months[date.getMonth()] + ', ' + date.getDate() + 
    (renderYear ? ' ' + date.getFullYear() : '');
  };

  return Utils;
})();
