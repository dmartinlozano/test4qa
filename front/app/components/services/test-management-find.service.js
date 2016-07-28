'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:FindService
 * @description
 * # FindService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')
.service('FindService', function(Restangular, $q, $rootScope) {

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

 });
