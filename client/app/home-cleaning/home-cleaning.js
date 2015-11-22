'use strict';

angular.module('App.homecleaning',[
  'ui.router',
  'angularNumberPicker',
  'App.services.api.booking',
  'App.services.api.homecleaning'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home-cleaning', {
        url: '/home-cleaning/{homeCleaningServiceId}/{zoneId}',
        templateUrl: 'app/home-cleaning/home-cleaning.html',
        controller: 'HomeCleaningCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('HomeCleaningCtrl', function (AuxApiService, _, $window, $stateParams, HomeCleaning, $mdDialog) {
    var vm = this;

    if($stateParams.homeCleaningServiceId){
      vm.loading = true;
      HomeCleaning.get({id: $stateParams.homeCleaningServiceId}, function(service){
        vm.loading = false;
        vm.service = service;

      }, function(resp){
        vm.loading = false;
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp)
            .ok('Ok')
        );
      });
    }

    vm.bedrooms = 1;
    vm.bathrooms = 1;

    vm.extrasLoading = true;
    AuxApiService.fetchExtras().then(function(extras){
      vm.extras = _.filter(extras, 'active');
      vm.extrasLoading = false;
    });

    fitFooter();
    angular.element($window).bind('resize',function(){
      fitFooter();
    });

    function fitFooter(){
      vm.inner = $window.innerHeight;
      $('#home-cleaning-form-container').height(vm.inner-55);
    }

  });
