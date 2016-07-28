'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:FindService
 * @description
 * # FindService
 * Servie of the testingItApp
 */
angular.module('testingItApp')
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
