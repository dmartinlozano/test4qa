'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:NavbarService
 * @description
 * # NavbarService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('NavbarService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {

  //Return all test projects
  this.getAllProjects = function($scope){
        Restangular.all("/api/testProject").getList().then(function(testProjects) {
          $scope.testProjects = testProjects;
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };
 }]);
