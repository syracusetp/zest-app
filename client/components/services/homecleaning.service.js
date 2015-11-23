'use strict';

angular.module('App.services.api.homecleaning', [
    'ngResource'
  ])
  .factory('HomeCleaning', function ($resource) {
    return $resource('/api/homecleanings/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  })
  .service('HomeCleaningApiService', HomeCleaningApiService);

function HomeCleaningApiService($resource) {

  var api = {
    fetchHomeCleaning: function(homeCleaningId) {
      var url = '/api/homecleanings/:homeCleaningId';
      return $resource(url, {homeCleaningId: homeCleaningId}).get().$promise;
    },

    fetchHomeCleaningPets: function(homeCleaningId){
      var url = '/api/aux/pets/:homeCleaningId';
      return $resource(url, {homeCleaningId: homeCleaningId}).query().$promise;
    },

    fetchHomeCleaningExtras: function(homeCleaningId){
      var url = '/api/aux/extras/:homeCleaningId';
      return $resource(url, {homeCleaningId: homeCleaningId}).query().$promise;
    }

  };

  return api;

}
