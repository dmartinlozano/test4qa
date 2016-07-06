'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:NavbarService
 * @description
 * # NavbarService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('NavbarService', ['Restangular', function(Restangular) {

  //Return all test projects
  this.getAllProjects = function($scope){
        Restangular.all("/api/testProject").getList().then(function(testProjects) {
          $scope.testProjects = testProjects;
        },function (res) {
          $scope.reqErr.allowed = false;
          $scope.reqErr.status = res.status;
          $scope.reqErr.message = res.data.message;
        });
      };
 }]);
