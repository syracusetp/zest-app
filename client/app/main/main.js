'use strict';

angular.module('zestApp.main',['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  })
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/aux/services').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    /*$scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };*/
  });
