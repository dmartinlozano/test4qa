'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.controller:DialogConfirmController
 * @description
 * # DialogConfirmController
 * Controller of the test4qaApp
 */
angular.module('test4qaApp')
.controller('DialogConfirmController', ['$scope', '$uibModalInstance', 'config',
function ($scope, $uibModalInstance, config) {

  $scope.config = config;

  $scope.ok = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.close(false);
  };
}]);
