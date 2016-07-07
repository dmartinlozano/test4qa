'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('TestProjectCrudService', ['Restangular', function(Restangular) {

  //service to add a new testProject
  this.addTestProject = function($scope, name,prefix,description){
        Restangular.one("/api/testProject").customPUT({name: name, prefix: prefix, description: description}).then(function() {
          $scope.closeModal();
        },function (res) {
          $scope.reqErr.allowed = false;
          $scope.reqErr.status = res.status;
          $scope.reqErr.message = res.data.message;
        });
      };

  //service to update a field of testProject
  this.updateTestProject = function($scope, id,field,newValue){
    Restangular.one("/api/testProject/"+id).customPOST({field:field, newValue:newValue}).then(function() {
      //TODO mostrar mensaje de ok
    },function (res) {
      $scope.reqErr.allowed = false;
      $scope.reqErr.status = res.status;
      $scope.reqErr.message = res.data.message;
    });
  };

  //TODO delete
 }]);
