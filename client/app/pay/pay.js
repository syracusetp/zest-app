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

    vm.method = 'online';

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
      if(vm.method === 'cash'){
        checkoutCash();
      }else{
        checkoutOnline();
      }
    };

    fitFooter();
    angular.element($window).bind('resize',function(){
      fitFooter();
    });

    function checkoutOnline(){
      console.log('checkout online');
    }

    function checkoutCash(){
      vm.working = true;

      vm.checkout = new Checkout({
        price: vm.booking.total,
        paid: false,
        type: 'cash',
        notes: 'BookingId='+vm.booking.id
      });

      vm.checkout.$save(function(checkout){
        vm.booking.CheckoutId = checkout.id;
        vm.booking.$update({id: vm.booking.id},function(){
          $state.go('checkout',{bookingId: vm.booking.id});
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
      $('#homecleaning-form-container').height(vm.inner-55);
    }

  });
