'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')

.service('TestSuiteCrudService', function(Restangular, $rootScope, $q) {

  //service to add a new testSuite
  this.addTestSuite = function(newTS){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testSuite").customPUT({newTS: newTS}).then(function(returnTS) {
      defered.resolve(returnTS);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //service to update a field of testSuite
 this.updateTestSuite = function(id,field,newValue){
   var defered = $q.defer();
   var promise = defered.promise;
    Restangular.one("/api/testSuite/"+id).customPOST({field:field, newValue:newValue}).then(function(returnTS) {
      defered.resolve(returnTS);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //delete a testSuite
  this.deleteTestSuite = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testSuite/"+id).remove().then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //Return all test suites
  this.getTestSuite = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testSuite/"+id).get().then(function(testSuite) {
      defered.resolve(testSuite);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };
 });
