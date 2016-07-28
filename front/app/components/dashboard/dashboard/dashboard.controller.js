'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.controller:DashBoardController
 * @description
 * # DashBoardController
 * Controller of the test4qaApp
 */
angular.module('test4qaApp')
.controller('DashBoardController', ['$rootScope', '$scope', 'DashboardService', '$state',
  function ($rootScope, $scope, DashboardService, $state) {

    $scope.reqErr = {};

    //if token not exist, go to login
    if (window.localStorage.getItem("user.token") === null){
      $state.go('login');
    }

    //get default project and build TM and TP
    DashboardService.getTMTreeFromDefaultProject();
  }
]);
