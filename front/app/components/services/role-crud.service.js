'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:RoleService
 * @description
 * # RoleService
 * Service of the test4qaApp
 */
angular.module('test4qaApp')

.service('RoleService', function(Restangular, $rootScope, $q) {

  //service to add a new role
  this.addRole = function(newRole){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/role").customPUT({newRole: newRole}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //service to update a field of role
  this.updateRole = function(id,field,newValue){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/role/"+id).customPOST({field:field, newValue:newValue}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //delete a role and show the list
  this.deleteRole = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/role/"+id).remove().then(function() {},function (res) {
      defered.reject(res);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };


  //Return all roles
  this.getAllRoles = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.all("/api/role").getList().then(function(roles) {
        defered.resolve(roles);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };
  
 });
