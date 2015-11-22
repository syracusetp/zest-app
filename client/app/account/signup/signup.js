'use strict';

angular.module('App.signup',['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl',
        resolve:{
          zones: function(AuxApiService){
            return AuxApiService.fetchZones();
          }
        }
      });
  })
  .controller('SignupCtrl', function ($scope, Auth, $location, $window, zones, $localStorage, $state, _) {
    $scope.zones = _.sortBy(_.filter(zones, 'active'), 'neighborhood');
    $scope.user = {
      ZoneId: $localStorage.ZoneId || $scope.zones[0].id
    };
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          mobilePhone: $scope.user.mobilePhone,
          ZoneId: $scope.user.ZoneId,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $state.go($localStorage.next, {zoneId: $localStorage.zoneId});
          delete $localStorage.next;
          delete $localStorage.zoneId;
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
