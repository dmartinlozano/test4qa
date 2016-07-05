'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:DashBoardController
 * @description
 * # DashBoardController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
.controller('NavbarController', ['$rootScope', '$scope', '$state', 'NavbarService',
  function ($rootScope, $scope, $state, NavbarService) {
    var vm = this;
    $scope.reqErr = {};

    //Init webComponent with the list of projects
    NavbarService.getAllProjects($scope);

  }
]);
