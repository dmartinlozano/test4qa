'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.controller:DashBoardController
 * @description
 * # DashBoardController
 * Controller of the test4qaApp
 */
angular.module('test4qaApp')
.controller('LoginController', ['$rootScope', '$scope', '$state', 'LoginService',
  function ($rootScope, $scope, $state, LoginService) {
    $scope.reqErr = {};

    //Login
    $scope.login = function() {
      LoginService.login($scope.name, $scope.password)
      .then(function(token) {
        window.localStorage.setItem("user.token",token);
        $state.go('dashBoard');
      })
      .catch(function(reqErr){
        $scope.reqErr = reqErr;
      });
    };
  }
]);
