'use strict';

angular.module('App.services.api.checkout', [
  'ngResource'
])
  .factory('Checkout', function ($resource) {
    return $resource('/api/checkouts/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  })
  .service('CheckoutApiService', CheckoutApiService);

function CheckoutApiService($resource) {

  var api = {
    fetchCheckout: function(checkoutId) {
      var url = '/api/checkouts/:checkoutId';
      return $resource(url, {checkoutId: checkoutId}).get().$promise;
    }

  };

  return api;

}
