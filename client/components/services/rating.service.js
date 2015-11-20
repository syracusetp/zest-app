'use strict';

angular.module('App.services.api.rating', [
  'ngResource'
])
  .factory('Rating', function ($resource) {
    return $resource('/api/ratings/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  });
