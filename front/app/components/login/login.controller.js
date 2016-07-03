'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
.controller('LoginController', ['$rootScope', '$scope', '$state', 'LoginService',
  function ($rootScope, $scope, $state, LoginService) {
    var vm = this;
    $scope.reqErr = {};

    vm.login = function() {
      LoginService.login(vm.name, vm.password, $scope);
    };

  }
]);
