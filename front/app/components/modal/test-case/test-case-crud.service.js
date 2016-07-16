'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('TestCaseCrudService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {

  //service to add a new testCase
  this.addTestCase = function($scope, newTC){
        Restangular.one("/api/testCase").customPUT({newTC: newTC}).then(function(returnTC) {
          $scope.newTC._id = returnTC._id;
          $scope.closeModal();
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

  //service to update a field of testCase
/*  this.updateTestCase = function($scope, id,field,newValue){
    Restangular.one("/api/testCase/"+id).customPOST({field:field, newValue:newValue}).then(function() {
      //TODO mostrar mensaje de ok
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };*/

  //delete a testCase
/*  this.deleteTestCase = function($scope, id){
    Restangular.one("/api/testCase/"+id).remove().then(function() {
            $scope.testCases = [];
            this.getAllCases($scope);
          },function (res) {
            $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
          });
  };*/

  //Return all test projects
/*  this.getAllCases = function($scope){
        Restangular.all("/api/testCase").getList().then(function(testCases) {
          $scope.testCases = testCases;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };*/

  //Return all test Cases
  this.getTestCase = function($scope, id){
        Restangular.one("/api/testCase/"+id).get().then(function(testCase) {
          $scope.testCase = testCase;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

      //Return all test projects -dropdown in ui-grid
/*  this.getAllCasesForDropDown = function(columnNum, gridOptions){
        Restangular.all("/api/testCase").getList().then(function(testCases) {
          gridOptions.columnDefs[columnNum].editDropdownOptionsArray = testCases;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };*/
 }]);
