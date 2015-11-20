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
  .controller('MainCtrl', function ($scope, $q, $state, _, AuxApiService) {

    var vm = this;

    vm.loading = true;

    var fServices = AuxApiService.fetchServices().then(function(services){
      vm.services = services;
      vm.service = vm.services[0];
    });

    var fZones = AuxApiService.fetchZones().then(function(zones){
      vm.zones = _.sortBy(zones, 'neighborhood');
      vm.zone = vm.zones[0];
    });

    $q.all([fServices, fZones]).finally(function(){
      vm.loading = false;
    });

    vm.bookNow = function(service){
      service = service ? service : vm.service.name;
      $state.go(service);
    };

    /*$http.get('/api/aux/services').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });*/

    /*$scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };*/
  });
