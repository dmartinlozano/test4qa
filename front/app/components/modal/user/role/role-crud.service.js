'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:RoleService
 * @description
 * # RoleService
 * Service of the testingItApp
 */
angular.module('testingItApp')

.service('RoleService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {

  //service to add a new role
  this.addRole = function($scope, newRole){
    Restangular.one("/api/role").customPUT({newRole: newRole}).then(function() {
      $scope.closeModal();
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //service to update a field of role
  this.updateRole = function($scope, id,field,newValue){
    Restangular.one("/api/role/"+id).customPOST({field:field, newValue:newValue}).then(function() {
      //TODO mostrar mensaje de ok
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //delete a role
  this.deleteRole = function($scope, id){
    Restangular.one("/api/role/"+id).remove().then(function() {
      $scope.roles = [];
      Restangular.all("/api/role").getList().then(function(roles) {
        $scope.roles = roles;
      },function (res) {
        $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
      });
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //Return all roles
  this.getAllRoles = function($scope){
    Restangular.all("/api/role").getList().then(function(roles) {
      $scope.roles = roles;
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //Return all roles -dropdown in ui-grid
  this.getAllRolesForDropDown = function(columnNum, gridOptions){
        Restangular.all("/api/role").getList().then(function(testProjects) {
          gridOptions.columnDefs[columnNum].editDropdownOptionsArray = testProjects;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };
 }]);
