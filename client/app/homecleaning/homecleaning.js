'use strict';

angular.module('App.homecleaning',['ui.router','angularNumberPicker'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home-cleaning', {
        url: '/home-cleaning/{bookingId}',
        templateUrl: 'app/homecleaning/homecleaning.html',
        controller: 'HomeCleaningCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('HomeCleaningCtrl', function (AuxApiService, _, $window) {
    var vm = this;

    vm.bedrooms = 1;
    vm.bathrooms = 1;

    vm.extrasLoading = true;
    AuxApiService.fetchExtras().then(function(extras){
      vm.extras = _.filter(extras, 'active');
      vm.extrasLoading = false;
    });

    vm.inner = $window.innerHeight;

    $("#homecform").height(vm.inner-55);

  });
