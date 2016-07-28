'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')

.service('TpjRolesService', function(Restangular, $rootScope, $q) {


  //Return all user-roles-tpj
  this.getRolesByProjects = function($scope){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.all("/api/userRolesTpj").getList().then(function(userRolesTpj) {
      defered.resolve(userRolesTpj);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //Update user-roles-tpj
  this.updateRolesByProjects = function(idUser, idTpjRole, field, newValue){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/userRolesTpj/"+idUser+"/"+idTpjRole).customPOST({field:field, newValue:newValue}).then(function() {
      defered.resolve();
    },function (res) {
      defered.resolve();
    });
    return promise;
  };


  //Update user-roles-tpj
  this.deleteRolesByProjects = function($scope, idUser, idTpjRole){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/userRolesTpj/"+idUser+"/"+idTpjRole).remove().then(function() {
      defered.resolve();
    },function (res) {
      defered.resolve();
    });
    return promise;
  };

  //add user-roles-tpj
  this.addUserTpjRole = function($scope, newUserTpjRole){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/userRolesTpj").customPUT({newUserTpjRole: newUserTpjRole}).then(function() {
      defered.resolve();
    },function (res) {
      defered.resolve();
    });
    return promise;
  };


 });
