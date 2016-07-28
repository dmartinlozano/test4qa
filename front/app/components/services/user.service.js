'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')

.service('UserService', function(Restangular, $rootScope, $q) {

  //service to add a new user
  this.addUser = function(newUser){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/user").customPUT({newUser: newUser}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //service to update a field of user
  this.updateUser = function(id,field,newValue){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/user/"+id).customPOST({field:field, newValue:newValue}).then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //delete a user
  this.deleteUser = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.one("/api/user/"+id).remove().then(function() {
      defered.resolve();
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };

  //Return all users
  this.getAllUsers = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    Restangular.all("/api/user").getList().then(function(users) {
      defered.resolve(users);
    },function (res) {
      defered.reject(res);
    });
    return promise;
  };


 });
