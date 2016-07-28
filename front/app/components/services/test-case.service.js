'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')

.service('TestCaseCrudService', function(Restangular, $rootScope, $q, TestProjectCrudService) {

  //service to add a new testCase
  this.addTestCase = function(newTC){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testCase").customPUT({newTC: newTC}).then(function(returnTC) {
      defered.resolve(returnTC);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //service to update a field of testCase
  this.updateFieldTestCase = function(id, field, newValue){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testCase/field/" + id).customPOST({field:field, newValue:newValue}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //service to update a field of testCase
  this.updateTestCase = function(testCase){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testCase/"+testCase._id).customPOST({testCase:testCase}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //delete a testCase
 this.deleteTestCase = function(id){
   var defered = $q.defer();
   var promise = defered.promise;
    Restangular.one("/api/testCase/"+id).remove().then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //Return one test Cases
  this.getTestCase = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testCase/"+id).get().then(function(testCase) {
      defered.resolve(testCase);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

 });
