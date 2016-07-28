'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')

.service('TestProjectCrudService', function(Restangular, $rootScope, $q) {

  //service to add a new testProject
  this.addTestProject = function($scope, testProject){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testProject").customPUT({testProject: testProject}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //service to update a field of testProject
  this.updateTestProject = function(testProject){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testProject/"+testProject._id).customPOST({testProject:testProject}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //Service to update only tmTreeData of testProject for a new TS.
  this.updateTmTreeDataTestProject = function(id, tmTreeData){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testProject/"+id).get().then(function(testProject) {
      testProject.tmTreeData = tmTreeData;
      Restangular.one("/api/testProject/"+testProject._id).customPOST({testProject:testProject}).then(function() {
        defered.resolve();
      },function (res) {
        defered.reject(res);
      });
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //delete a testProject
  this.deleteTestProject = function($scope, id){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testProject/"+id).remove().then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //Return all test projects
  this.getAllProjects = function($scope){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.all("/api/testProject").getList().then(function(testProjects) {
      defered.resolve(testProjects);
    },function (res) {
      defered.reject(res);
    });
    return promise;
    };

  //Return test project
  this.getTestProject = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/testProject/"+id).get().then(function(testProject) {
      defered.resolve(testProject);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

 });
