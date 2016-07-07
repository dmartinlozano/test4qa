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
    $scope.reqErr = {};

    //Init webComponent with the list of projects
    NavbarService.getAllProjects($scope);

    //Open generic modal by name from navbar
    $scope.openModal = function(modalName){
      $('#'+modalName).modal('show');
    };

    //TestProject management modal is closed, update the projects
    $rootScope.$on('test-project-crud.directive:hidden.bs.modal', function() {
      NavbarService.getAllProjects($scope);
    });

    $scope.existAlerts = function(){
      $scope.unreadAlerts = $rootScope.unreadAlerts;
      if ($rootScope.unreadAlerts === 0){return false;} else{return true;}
    };
  }
]);
