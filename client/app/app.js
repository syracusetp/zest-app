'use strict';

angular.module('zestApp', [
  'ngStorage',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMaterial',
  'ui.router',
  'ui.bootstrap',
  'ng-wrap',
  'App.services.api.aux',
  'App.contactus',
  'App.referrals',
  'App.profile',
  'App.rate',
  'App.admin',
  'App.login',
  'App.settings',
  'App.signup',
  'App.main',
  'App.homecleaning',
  'App.schedule',
  'App.pay',
  'App.checkout',
  'App.bookings',
  'App.bookoffline'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          $cookieStore.remove('CustomerId');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, ngWrap) {
    ngWrap('_');
    ngWrap('moment');

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });
