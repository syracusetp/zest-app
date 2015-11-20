'use strict';

angular.module('App.main',['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('MainCtrl', function ($q, $state, _, AuxApiService) {

    var vm = this;

    vm.loading = true;

    var fServices = AuxApiService.fetchServices().then(function(services){
      vm.services = _.sortBy(_.filter(services, 'active'), 'rank');
      vm.service = vm.services[0];
    });

    var fZones = AuxApiService.fetchZones().then(function(zones){
      vm.zones = _.sortBy(_.filter(zones, 'active'), 'neighborhood');
      vm.zone = vm.zones[0];
    });

    $q.all([fServices, fZones]).finally(function(){
      vm.loading = false;
    });

    vm.bookNow = function(service){
      service = service ? service : vm.service.name;
      $state.go(service);
    };

  });
