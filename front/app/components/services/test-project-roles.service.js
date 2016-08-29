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
  this.getRolesByProjects = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.all("/api/userRolesTpj").getList().then(function(userRolesTpj) {
      defered.resolve(userRolesTpj);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //Update (if exits) or add a new user-roles-tpj by userId
  this.updateOrAddRolesByProjects = function(idUser, idTpjRole, idRole){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.all("/api/userRolesTpjByUserId/" + idUser).getList().then(function(userRolesTpj) {
      var found = false;
      for (var i = 0; i < userRolesTpj.length; i++){
        if (idTpjRole === userRolesTpj[i].role){
          found = true;
        }
      }
      if (found){
        //update
        Restangular.one("/api/userRolesTpj/"+idUser+"/"+idTpjRole).customPOST({field:"role", newValue:idRole}).then(function() {
          defered.resolve();
        },function (res) {
          defered.reject(res);
        });
      }else{
        //add
        var newUserTpjRole = {name: idUser, project: idTpjRole, role: idRole};
        Restangular.one("/api/userRolesTpj").customPUT({newUserTpjRole: newUserTpjRole}).then(function() {
          defered.resolve();
        },function (res) {
          defered.reject(res);
        });
      }
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
      defered.reject(res);
    });
    return promise;
  };


  //Update user-roles-tpj
  this.deleteRolesByProjects = function(idUser, idTpjRole){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/userRolesTpj/"+idUser+"/"+idTpjRole).remove().then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //add user-roles-tpj
  this.addUserTpjRole = function(newUserTpjRole){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/userRolesTpj").customPUT({newUserTpjRole: newUserTpjRole}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };


 });
