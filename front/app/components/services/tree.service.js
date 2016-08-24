'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:TreeService
 * @description
 * # TreeService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')
.service('TreeService', function(Restangular, $q, $rootScope) {

  //service to find
  this.findInTmTree = function(searchString){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/find/" + $rootScope.currentTpj._id).customPOST({searchString:searchString}).then(function(findResults) {
      defered.resolve(findResults);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //recursive delete ts
  this.deleteTSRecursive = function(tsToDelete){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.several("/api/deleteTSRecursive/",tsToDelete).remove().then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //recursive delete tc
  this.deleteTCRecursive = function(tcToDelete){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.several("/api/deleteTCRecursive/",tcToDelete).remove().then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

 });
