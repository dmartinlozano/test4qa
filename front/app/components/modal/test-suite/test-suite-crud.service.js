'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('TestSuiteCrudService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {

  //service to add a new testSuite
  this.addTestSuite = function($scope, newTS){
        Restangular.one("/api/testSuite").customPUT({newTS: newTS}).then(function(returnTS) {
          $scope.testSuite._id=returnTS._id;
          $scope.closeModalToAdd();
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

  //service to update a field of testSuite
 this.updateTestSuite = function($scope, id,field,newValue){
    Restangular.one("/api/testSuite/"+id).customPOST({field:field, newValue:newValue}).then(function() {
      //TODO mostrar mensaje de ok
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //delete a testSuite
  this.deleteTestSuite = function($scope, id){
    Restangular.one("/api/testSuite/"+id).remove().then(function() {
          },function (res) {
            $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
          });
  };

  //Return all test suites
  this.getTestSuite = function($scope, id){
        Restangular.one("/api/testSuite/"+id).get().then(function(testSuite) {
          $scope.testSuite = testSuite;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };
 }]);
