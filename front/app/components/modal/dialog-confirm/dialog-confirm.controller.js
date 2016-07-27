'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:DialogConfirmController
 * @description
 * # DialogConfirmController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
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
