'use strict';

angular.module('zestApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      title: 'Profile',
      sref: 'profile'
    },{
      title: 'Bookings',
      sref: 'bookings'
    },{
      title: 'Referrals',
      sref: 'referrals'
    },{
      title: 'Contact Us',
      sref: 'contactus'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
