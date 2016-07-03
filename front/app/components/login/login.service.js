'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:LoginService
 * @description
 * # LoginService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('LoginService', ['Restangular', '$state', function(Restangular, $state) {

  this.login = function(name, password, $scope){
        Restangular.one("/auth/login").customPOST({name: name, password: password}).then(function(token) {
          window.localStorage.setItem("user.token",token);
          $state.go('dashBoard');
        },function (res) {
          $scope.reqErr.allowed = false;
          $scope.reqErr.status = res.status;
          $scope.reqErr.message = res.data.message;
        });
  };
 }]);
