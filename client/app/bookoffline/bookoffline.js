'use strict';

angular.module('App.bookoffline',['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('bookoffline', {
        url: '/bookoffline',
        templateUrl: 'app/bookoffline/bookoffline.html',
        controller: 'BookOfflineCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('BookOfflineCtrl', function () {

  });
