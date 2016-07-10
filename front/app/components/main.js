'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testingItApp
 */
angular.module('testingItApp', [ 'ngAnimate', 'ngCookies', 'ngResource', 'ui.router', 'ngSanitize', 'restangular', 'environment', 'restangular', 'angularBootstrapNavTree', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'])
  .config(['$stateProvider', '$urlRouterProvider', 'envServiceProvider',
    function($stateProvider, $urlRouterProvider, envServiceProvider) {
      //$translateProvider.useLoader('langLoader');
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: '/views/login/login.html',
          controller: 'LoginController',
          controllerAs: 'loginCtrl'
        })
        .state('dashBoard', {
          url: '/dashBoard',
          templateUrl: '/views/dashboard/dashboard/dashboard.html',
          controller: 'DashBoardController',
          controllerAs: 'DashBoardCtrl'
        });

      $urlRouterProvider.otherwise('/login');

      envServiceProvider.config({
       domains: {
         development: ['localhost'],
         production: ['acme.com']
       },
       vars: {
         development: {
           backURL: 'http://localhost:9090',
           frontURL: 'http://localhost:8080',
           preferedLanguage: 'es'
         },
         production: {
           backURL: 'http://localhost:9090',
           frontURL: 'http://localhost:8080',
           preferedLanguage: 'es'
         }
       }
     });
     envServiceProvider.check();
     console.log("Environment: " + envServiceProvider.get());
     console.log("BaseUrl for authentication: " + envServiceProvider.read('backURL'));
    }
  ])
  //Interept all request to add token
  .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push(['$q', function($q) {
        return {
          request: function(httpConfig) {
            var token = localStorage.getItem("user.token");
            if (token) {
              httpConfig.headers.authorization = token;
            }
            return httpConfig;
          },
          responseError: function(response) {
            return $q.reject(response);
          }
        };
      }]);
  }])
  .run(['Restangular', 'envService',
    function(Restangular, envService) {
      console.log("BaseUrl for Restangular: " + envService.read('backURL'));
      Restangular.setBaseUrl(envService.read('backURL'));
    }
  ]);
