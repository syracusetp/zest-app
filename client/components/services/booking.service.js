'use strict';

angular.module('App.services.api.booking', [
    'ngResource'
  ])
  .factory('Booking', function ($resource) {
    return $resource('/api/bookings/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  })
  .service('BookingApiService', BookingApiService);

function BookingApiService($resource) {

  var api = {
    fetchBooking: function(bookingId) {
      var url = '/api/bookings/:bookingId';
      return $resource(url, {bookingId: bookingId}).get().$promise;
    },

    fetchBookingsByCustomerId: function(customerId){
      var url = '/api/bookings/customer/:customerId';
      return $resource(url, {customerId: customerId}).query().$promise;
    }

  };

  return api;

}
