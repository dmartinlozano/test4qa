'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.service:FindService
 * @description
 * # FindService
 * Servie of the test4qaApp
 */
angular.module('test4qaApp')
.service('FindService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {

  //service to find
  this.find = function($scope, searchString){
    Restangular.one("/api/find/" + $rootScope.currentTpj._id).customPOST({searchString:searchString}).then(function(findResults) {
      $rootScope.$emit('test-management-find.service:find', searchString, findResults);
      //TODO es recibido en un componente que tiene que dibujar un modal con el resultado
    },function (res) {
      $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
    });
  };

 }]);
