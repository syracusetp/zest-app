'use strict';

angular.module('App.checkout',[
  'ui.router',
  'App.services.api.booking',
  'App.services.api.checkout'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout/{bookingId}',
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('CheckoutCtrl', function ($q, Checkout, _, $window, $stateParams, Booking, $mdDialog) {
    var vm = this;

    vm.loading = true;
    vm.booking = Booking.get({id: $stateParams.bookingId}, function(booking){
      vm.booking = booking;
      vm.loading = false;
    }, function(resp){
      vm.loading = false;
      $mdDialog.show(
        $mdDialog.alert()
          .title('Error')
          .content(resp)
          .ok('Ok')
      );
    });

  });
