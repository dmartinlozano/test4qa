'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')

.service('TestCaseCrudService', ['Restangular', '$rootScope', 'TestProjectCrudService', function(Restangular, $rootScope, TestProjectCrudService) {

  //service to add a new testCase
  this.addTestCase = function($scope, newTC){
        newTC.name = "["+$rootScope.currentTpj.prefix+"-"+$rootScope.currentTpj.currentTcNumber+"] "+newTC.name;
        Restangular.one("/api/testCase").customPUT({newTC: newTC}).then(function(returnTC) {
          //Update increment of testPlan when a newTestCase is created:
          TestProjectCrudService.updateCurrentTcNumberTestProject($scope,$rootScope.currentTpj._id);
          $scope.testCase._id = returnTC._id;
          $scope.closeModalToAdd();
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

  //service to update a field of testCase
  this.updateFieldTestCase = function($scope, id,field,newValue){
    Restangular.one("/api/testCase/field/"+id).customPOST({field:field, newValue:newValue}).then(function() {
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //service to update a field of testCase
  this.updateTestCase = function($scope, testCase){
    Restangular.one("/api/testCase/"+testCase._id).customPOST({testCase:testCase}).then(function() {
      //TODO mostrar mensaje de ok
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //delete a testCase
 this.deleteTestCase = function($scope, id){
    Restangular.one("/api/testCase/"+id).remove().then(function() {
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //Return all test Cases
  this.getTestCase = function($scope, id){
        Restangular.one("/api/testCase/"+id).get().then(function(testCase) {
          $scope.testCase = testCase;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };
 }]);
