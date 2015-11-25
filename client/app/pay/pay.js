'use strict';

angular.module('App.pay',[
  'ui.router',
  'App.services.api.booking',
  'App.services.api.checkout'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('pay', {
        url: '/pay/{bookingId}',
        templateUrl: 'app/pay/pay.html',
        controller: 'PayCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('PayCtrl', function ($q, Checkout, _, $window, $stateParams, Booking, $mdDialog, $state) {
    var vm = this;

    vm.method = 'transfer';

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

    vm.checkout = function(){
      if(vm.method === 'transfer'){
        checkoutTransfer();
      }else{
        checkoutOnline();
      }
    };

    fitFooter();
    angular.element($window).bind('resize',function(){
      fitFooter();
    });

    function checkoutOnline(){
      $mdDialog.show(
        $mdDialog.alert()
          .title('Error')
          .content('Online Checkout not yet available.')
          .ok('Ok')
      );
    }

    function checkoutTransfer(){
      vm.working = true;

      vm.checkout = new Checkout({
        price: vm.booking.total,
        type: 'cash',
        notes: 'BookingId='+vm.booking.id
      });

      vm.checkout.$save(function(checkout){
        vm.booking.CheckoutId = checkout.id;
        vm.booking.active = true;
        vm.booking.$update({id: vm.booking.id},function(){
          $state.go('checkout',{bookingId: vm.booking.id, method: vm.method});
          vm.working = false;
        }, function(resp){
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error')
              .content(resp)
              .ok('Ok')
          );
        });
      }, function(resp){
        vm.working = false;
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp)
            .ok('Ok')
        );
      });
    }

    function fitFooter(){
      vm.inner = $window.innerHeight;
      $('#pay-form-container').height(vm.inner-55);
    }

  });
