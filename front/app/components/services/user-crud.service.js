'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')

.service('UserService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {

  //service to add a new user
  this.addUser = function($scope, newUser){
    Restangular.one("/api/user").customPUT({newUser: newUser}).then(function() {
      $scope.closeModal();
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //service to update a field of user
  this.updateUser = function($scope, id,field,newValue){
    Restangular.one("/api/user/"+id).customPOST({field:field, newValue:newValue}).then(function() {
      //TODO mostrar mensaje de ok
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //delete a user
  this.deleteUser = function($scope, id){
    Restangular.one("/api/user/"+id).remove().then(function() {
      $scope.users = [];
      Restangular.all("/api/user").getList().then(function(users) {
        $scope.users = users;
      },function (res) {
        $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
      });
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

  //Return all users
  this.getAllUsers = function($scope){
    Restangular.all("/api/user").getList().then(function(users) {
      $scope.users = users;
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };


 }]);
