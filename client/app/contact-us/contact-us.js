'use strict';

angular.module('App.contactus',['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'app/contact-us/contact-us.html',
        controller: 'ContactUsCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('ContactUsCtrl', function ($q, $state, _, AuxApiService) {

  });
