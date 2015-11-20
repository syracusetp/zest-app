'use strict';

angular.module('App.services.api.customer', [
  'ngResource'
])
  .factory('Customer', function ($resource) {
    return $resource('/api/customers/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  })
  .service('CustomerApiService', CustomerApiService);

function CustomerApiService($resource) {

  var api = {
    fetchCustomer: function(customerId) {
      var url = '/api/customers/:customerId';
      return $resource(url, {customerId: customerId}).get().$promise;
    }

  };

  return api;

}
