'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')

.service('TpjRolesService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {


  //Return all user-roles-tpj
  this.getRolesByProjects = function($scope){
    Restangular.all("/api/userRolesTpj").getList().then(function(userRolesTpj) {
      $scope.userRolesTpj = userRolesTpj;
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //Update user-roles-tpj
  this.updateRolesByProjects = function($scope, idUser, idTpjRole, field, newValue){
    Restangular.one("/api/userRolesTpj/"+idUser+"/"+idTpjRole).customPOST({field:field, newValue:newValue}).then(function() {
      //TODO mostrar mensaje de ok
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };


  //Update user-roles-tpj
  this.deleteRolesByProjects = function($scope, idUser, idTpjRole){
    Restangular.one("/api/userRolesTpj/"+idUser+"/"+idTpjRole).remove().then(function() {
      $scope.userRolesTpj = [];
      Restangular.all("/api/userRolesTpj").getList().then(function(userRolesTpj) {
        $scope.userRolesTpj = userRolesTpj;
      },function (res) {
        $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
      });
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //add user-roles-tpj
  this.addUserTpjRole = function($scope, newUserTpjRole){
    Restangular.one("/api/userRolesTpj").customPUT({newUserTpjRole: newUserTpjRole}).then(function() {
      $scope.closeModal();
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };


 }]);
