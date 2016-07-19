'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:DashBoardController
 * @description
 * # DashBoardController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
.controller('NavbarController', ['$rootScope', '$scope', '$state', 'NavbarService', 'TestProjectCrudService',
  function ($rootScope, $scope, $state, NavbarService, TestProjectCrudService) {
    $scope.reqErr = {};

    //Init webComponent with the list of projects
    TestProjectCrudService.getAllProjects($scope);

    //Change current project
    $scope.changeProject = function(projectId){
        $rootScope.$emit('navbar.controler:changeProject', projectId);
    }

    //Open generic modal by name from navbar
    $scope.openModal = function(modalName){
      $('#'+modalName).modal('show');
    };

    //TestProject management modal is closed, update the projects
    $rootScope.$on('test-project-crud.directive:hidden.bs.modal', function() {
      TestProjectCrudService.getAllProjects($scope);
    });

    //return if exists unread alerts
    $scope.existAlerts = function(){
      $scope.unreadAlerts = $rootScope.unreadAlerts;
      if ($rootScope.unreadAlerts === 0){return false;} else{return true;}
    };

    //logout
    $scope.logout = function(){
      window.localStorage.removeItem("user.token");
      $state.go('login');
    }
  }
]);
