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
  .controller('HomeCleaningCtrl', function () {
    var vm = this;

    vm.bedrooms = 1;
    vm.bathrooms = 1;

  });
