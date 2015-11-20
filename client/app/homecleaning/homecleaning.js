'use strict';

angular.module('App.homecleaning',['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home-cleaning', {
        url: '/home-cleaning/{bookingId}',
        templateUrl: 'app/homecleaning/homecleaning.html',
        controller: 'HomeCleaningCtrl',
        controllerAs: 'vm',
        resolve: {
          services: function(AuxApiService){
            return AuxApiService.fetchServices();
          },
          zones: function(AuxApiService){
            return AuxApiService.fetchZones();
          }
        }
      });
  })
  .controller('HomeCleaningCtrl', function ($scope, $http, zones, services, $state, _) {

    var vm = this;

    vm.services = services;
    vm.service = vm.services[0];

    vm.zones = _.sort(zones);
    vm.neighborhood = vm.zones[0];

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
