'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:PermissionsService
 * @description
 * # PermissionsService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')
.service('PermissionsService', function(Restangular, $q, $rootScope) {

  //get permissions
  this.getPermissions = function(tpjId, component){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/permission/"+tpjId+"/"+component).get().then(function(permission) {
        defered.resolve(permission);
    },function (res) {
        defered.reject(res);
    });
    return promise;
  };

 });
