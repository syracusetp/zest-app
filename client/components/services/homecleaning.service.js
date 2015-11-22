'use strict';

angular.module('App.services.api.homecleaning', [
    'ngResource'
  ])
  .factory('HomeCleaning', function ($resource) {
    return $resource('/api/homecleaning/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  })
  .service('HomeCleaningApiService', HomeCleaningApiService);

function HomeCleaningApiService($resource) {

  var api = {
    fetchHomeCleaning: function(bookingId) {
      var url = '/api/homecleanings/:homeCleaningId';
      return $resource(url, {homeCleaningId: homeCleaningId}).get().$promise;
    }

  };

  return api;

}
