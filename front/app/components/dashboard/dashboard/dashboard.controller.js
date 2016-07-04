'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:DashBoardController
 * @description
 * # DashBoardController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
.controller('DashBoardController', ['$rootScope', '$scope',
  function ($rootScope, $scope) {
    var vm = this;
    $scope.reqErr = {};

  }
]);
