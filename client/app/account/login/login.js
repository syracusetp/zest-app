'use strict';

angular.module('App.login',['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      });
  })
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $state, $localStorage) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to next
          var next = $state.get($localStorage.next) ? $localStorage.next : 'main';
          $state.go(next, {zoneId: $localStorage.zoneId});
          delete $localStorage.next;
          delete $localStorage.zoneId;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
