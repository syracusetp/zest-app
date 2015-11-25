'use strict';

angular.module('App.services.utils', [
  'ngResource'
])
  .service('Utils', Utils);

function Utils() {

  var api = {
    ctime: function(etime) {
      return (''+(parseInt(etime)+50)).replace(/50$/,'30');
    }

  };

  return api;

}
