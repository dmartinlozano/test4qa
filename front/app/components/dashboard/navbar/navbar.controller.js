'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.controller:DashBoardController
 * @description
 * # DashBoardController
 * Controller of the test4qaApp
 */
angular.module('test4qaApp')
.controller('NavbarController', ['$rootScope', '$scope', '$state', 'TestProjectCrudService',
  function ($rootScope, $scope, $state, TestProjectCrudService) {
    $scope.reqErr = {};

    //Init webComponent with the list of projects
    TestProjectCrudService.getAllProjects().then(function(testProjects){
      $scope.testProjects = testProjects;
    }).catch(function(res){
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });

    //Change current project
    $scope.changeProject = function(projectId){
        $rootScope.$emit('navbar.controler:changeProject', projectId);
    }

    //Show modal to new test project
    $scope.newTestProject = function(){
        $rootScope.$emit('tpj-panel.directive:newTestProject');
    };

    //Open generic modal by name from navbar
    $scope.openModal = function(modalName){
      $('#'+modalName).modal('show');
    };

    //TestProject management modal is closed, update the projects
    $rootScope.$on('test-project-crud.directive:hidden.bs.modal', function() {
      TestProjectCrudService.getAllProjects().then(function(testProjects){
        $scope.testProjects = testProjects;
      }).catch(function(res){
        $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
      });
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

    //show modal to change password
    $scope.changePassword = function(){
      $scope.openModal("changePasswordModal");
    }
  }
]);
