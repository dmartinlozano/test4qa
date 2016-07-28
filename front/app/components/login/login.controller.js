'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:DashBoardController
 * @description
 * # DashBoardController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
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
