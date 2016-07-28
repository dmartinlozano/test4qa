'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:LoginService
 * @description
 * # LoginService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('LoginService', function(Restangular, $state, $q) {

  this.login = function(name, password){
    var defered = $q.defer();
    var promise = defered.promise;

    Restangular.one("/auth/login").customPOST({name: name, password: password}).then(function(token) {
      defered.resolve(token.token);
    },function (res) {
      var reqErr={};
      reqErr.allowed = false;
      reqErr.status = res.status;
      reqErr.message = res.data.message;
      defered.reject(reqErr);
    });

    return promise;
  };
 });
