'use strict';

angular.module('App.services.api.referral', [
  'ngResource'
])
  .service('ReferralApiService', ReferralApiService);

function ReferralApiService($http, $q) {

  var api = {
    send: function(referral) {
      var deferred = $q.defer();

      $http.post('/api/referrals', referral).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(err) {
          deferred.reject(err);
        }.bind(this));

      return deferred.promise;
    }

  };

  return api;

}
