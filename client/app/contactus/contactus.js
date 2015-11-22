'use strict';

angular.module('App.contactus',['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('contactus', {
        url: '/contactus',
        templateUrl: 'app/contactus/contactus.html',
        controller: 'ContactUsCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('ContactUsCtrl', function () {

  });
