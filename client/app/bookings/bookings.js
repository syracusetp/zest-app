'use strict';

angular.module('App.bookings',[
  'ui.router',
  'App.services.api.booking',
  'App.services.api.checkout'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('bookings', {
        url: '/bookings',
        templateUrl: 'app/bookings/bookings.html',
        controller: 'BookingsCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('BookingsCtrl', function ($q, Auth, _, BookingApiService, Booking, $mdDialog) {
    var vm = this;

    vm.loading = true;

    BookingApiService.fetchBookingsByCustomerId(Auth.getCustomerId())
      .then(function(bookings){
        vm.bookings = bookings;
      })
      .catch(function(resp){
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp)
            .ok('Ok')
        );
      }).finally(function(){
        vm.loading = false;
      });

  });
