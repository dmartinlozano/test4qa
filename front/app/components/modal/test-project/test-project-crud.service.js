'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('TestProjectCrudService', ['Restangular', 'NavbarService', '$rootScope', function(Restangular, NavbarService, $rootScope) {

  //service to add a new testProject
  this.addTestProject = function($scope, name,prefix,description){
        Restangular.one("/api/testProject").customPUT({name: name, prefix: prefix, description: description}).then(function() {
          $scope.closeModal();
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

  //service to update a field of testProject
  this.updateTestProject = function($scope, id,field,newValue){
    Restangular.one("/api/testProject/"+id).customPOST({field:field, newValue:newValue}).then(function() {
      //TODO mostrar mensaje de ok
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //delete a testProject
  this.deleteTestProject = function($scope, id){
    Restangular.one("/api/testProject/"+id).remove().then(function() {
            $scope.testProjects = [];
            this.getAllProjects($scope);
          },function (res) {
            $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
          });
  };

  //Return all test projects
  this.getAllProjects = function($scope){
        Restangular.all("/api/testProject").getList().then(function(testProjects) {
          $scope.testProjects = testProjects;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

  //Return all test projects
  this.getTestProject = function($scope, id){
        Restangular.one("/api/testProject/"+id).get().then(function(testProject) {
          $scope.testProject = testProject;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

      //Return all test projects -dropdown in ui-grid
  this.getAllProjectsForDropDown = function(columnNum, gridOptions){
        Restangular.all("/api/testProject").getList().then(function(testProjects) {
          gridOptions.columnDefs[columnNum].editDropdownOptionsArray = testProjects;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };
 }]);
