'use strict';

angular.module('App.services.api.aux', [
  'ngResource'
])
  .service('AuxApiService', LocalApiService);

function LocalApiService($resource) {

  var api = {
    fetchServices: function() {
      var url = '/api/aux/services';
      return $resource(url, {}).query().$promise;
    },

    fetchZones: function(){
      var url = '/api/aux/zones';
      return $resource(url, {}).query().$promise;
    },

    fetchExtras: function() {
      var url = '/api/aux/extras';
      return $resource(url, {}).query().$promise;
    },

    fetchFrequencies: function() {
      var url = '/api/aux/frequencies';
      return $resource(url, {}).query().$promise;
    },

    fetchPets: function(){
      var url = '/api/aux/pets';
      return $resource(url, {}).query().$promise;
    }

  };

  return api;

}
