'use strict';

angular.module('App.referrals',['ui.router', 'App.services.api.referral','ui.utils.masks'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('referrals', {
        url: '/referrals',
        templateUrl: 'app/referrals/referrals.html',
        controller: 'ReferralsCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('ReferralsCtrl', function ($q, $state, _, ReferralApiService, Auth) {
    var vm = this;

    vm.send = function(form){
      vm.sending = true;
      vm.referral.CustomerId = Auth.getCustomerId();
      ReferralApiService.send(vm.referral).then(function(){
        vm.sending = false;
      }).finally(function(){
        vm.referral = {};
        vm.referral.mobilePhone = '';
        vm.done = true;
        form.$setPristine();
        form.$setUntouched();
      });
    };

  });
