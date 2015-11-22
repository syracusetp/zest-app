'use strict';

angular.module('App.homecleaning',[
  'ui.router',
  'angularNumberPicker',
  'App.services.api.booking',
  'App.services.api.homecleaning'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('homecleaning', {
        url: '/homecleaning/{homeCleaningServiceId}/{zoneId}',
        templateUrl: 'app/homecleaning/homecleaning.html',
        controller: 'HomeCleaningCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('HomeCleaningCtrl', function ($q, Auth, AuxApiService, _, $window, $stateParams, HomeCleaning,
                                            $mdDialog, CustomerApiService) {
    var vm = this;

    init();

    vm.isValid = function(){
      return true;
    };

    vm.next = function(){
      vm.service.extras = _.filter(vm.service.extras, 'selected');
      console.log('service=',vm.service);
    };

    fitFooter();
    angular.element($window).bind('resize',function(){
      fitFooter();
    });

    function init(){
      if($stateParams.homeCleaningServiceId){
        vm.loading = true;
        HomeCleaning.get({id: $stateParams.homeCleaningServiceId}, function(service){
          vm.service = service;
          fetchOthers();
        }, function(resp){
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error')
              .content(resp)
              .ok('Ok')
          );
        });
      }else {
        vm.service = new HomeCleaning({
          bedrooms: 1,
          bathrooms: 1
        });
        fetchOthers();
      }
    }

    function fetchOthers(){
      var fCustomer = CustomerApiService.fetchCustomer(Auth.getCustomerId()).then(function(customer){
        vm.service.address = customer.address;
        vm.service.city = customer.city;
        vm.service.state = customer.state;
        vm.service.postcode = customer.postcode;
        vm.service.ZoneId = customer.ZoneId;
      });

      var fZones = AuxApiService.fetchZones().then(function(zones){
        vm.zones = _.sortBy(_.filter(zones, 'active'), 'neighborhood');
      });

      var fExtras = AuxApiService.fetchExtras().then(function(extras){
        // TODO: set selected here
        vm.service.extras = _.sortBy(_.filter(extras, 'active'), 'rank');
      });

      var fFrequencies = AuxApiService.fetchFrequencies().then(function(frequencies){
        // TODO: set selected here
        vm.frequencies = _.sortBy(_.filter(frequencies, 'active'), 'rank');
      });

      $q.all([fCustomer, fZones, fExtras, fFrequencies]).catch(function(resp){
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp)
            .ok('Ok')
        );
      }).finally(function(){
        vm.loading = false;
      });

    }

    function fitFooter(){
      vm.inner = $window.innerHeight;
      $('#homecleaning-form-container').height(vm.inner-55);
    }

  });
