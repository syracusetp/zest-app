'use strict';

angular.module('App.referrals',['ui.router', 'App.services.api.referral'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('referrals', {
        url: '/referrals',
        templateUrl: 'app/referrals/referrals.html',
        controller: 'ReferralsCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('ReferralsCtrl', function ($q, $state, _, ReferralApiService, Auth, $mdDialog) {
    var vm = this;

    vm.send = function(form){
      vm.sending = true;
      vm.referral.CustomerId = Auth.getCustomerId();
      ReferralApiService.send(vm.referral).then(function(){
        vm.sending = false;
      }).catch(function(resp){
        vm.sending = false;
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp)
            .ok('Ok')
        );
      }).finally(function(){
        vm.referral = {};
        vm.referral.mobilePhone = '';
        vm.done = true;
        form.$setPristine();
        form.$setUntouched();
      });
    };

  });
