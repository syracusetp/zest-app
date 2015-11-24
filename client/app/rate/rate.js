'use strict';

angular.module('App.rate',['ui.router', 'App.services.api.rating'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rate', {
        url: '/rate/:bookingId/:customerId/:employeeId/:rating',
        templateUrl: 'app/rate/rate.html',
        controller: 'RateCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('RateCtrl', function ($stateParams, Rating, $mdDialog) {
    var vm = this;
    vm.rating = new Rating({
      BookingId: $stateParams.bookingId,
      CustomerId: $stateParams.customerId,
      EmployeeId: $stateParams.employeeId,
      rating: $stateParams.rating,
      arrival: false,
      professionalism: false,
      quality: false,
      other: false
    });

    vm.loading = true;
    vm.rating.$save(function(){
      vm.loading = false;

    }, function(resp){
      vm.loading = false;

      $mdDialog.show(
        $mdDialog.alert()
          .title('Error')
          .content(resp.data.message)
          .ok('Ok')
      );
    });

    vm.imgSrc = '/assets/images/zestar/'+$stateParams.employeeId+'.png';

    vm.comment = function(){
      vm.commenting = true;
      vm.rating.$update({id : vm.rating.id}, function(){
        vm.commenting = false;

        vm.done = true;
      }, function(resp){
        vm.commenting = false;

        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp.data.message)
            .ok('Ok')
        );
      });
    };

  });
