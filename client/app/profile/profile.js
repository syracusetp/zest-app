'use strict';

angular.module('App.profile',[
  'ui.router',
  'ngMessages',
  'App.services.api.customer',
  'App.services.api.aux'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('ProfileCtrl', function (CustomerApiService, Auth, AuxApiService, $q, _, $scope,
                                       Customer, $mdDialog, $timeout) {
    var vm = this;

    vm.loading = true;

    vm.customer = Customer.get({
      id: Auth.getCustomerId() || 1
    }, function(customer){

      vm.customer = customer;

      AuxApiService.fetchZones().then(function(zones){

        vm.zones = _.sortBy(_.filter(zones, 'active'), 'neighborhood');
        vm.customer.ZoneId = vm.customer.ZoneId || vm.zones[0].id;

        $scope.$evalAsync(function() {
          vm.loading = false;
        });

      }, function(resp){
        vm.loading = false;
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp.data)
            .ok('Ok')
        );
      });

    });

    vm.save = function() {

      vm.saving = true;

      vm.customer.$update({id: vm.customer.id},function(){
        vm.saving = false;
        vm.done = true;
        $timeout(function(){
          vm.done = false;
        },1500);

      }, function(resp){
        vm.saving = false;
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp.data)
            .ok('Ok')
        );
      });

    };

  });
