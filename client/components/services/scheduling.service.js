'use strict';

angular.module('App.services.api.scheduling', [
  'ngResource'
])
  .service('SchedulingApiService', SchedulingApiService);

function SchedulingApiService($resource, $q, $http) {

  var api = {
    fetchOpenings: function(hours) {
      var url = '/api/scheduling/openings/:hours';
      return $resource(url, {hours: hours}).get().$promise;
    },

    complete: function(schedule) {
      var deferred = $q.defer();

      $http.post('/api/scheduling/complete', schedule).
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
