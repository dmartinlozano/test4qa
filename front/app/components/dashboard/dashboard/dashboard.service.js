'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('DashboardService', ['Restangular', '$state', '$rootScope', function(Restangular, $state, $rootScope) {

  this.getTMTreeFromDefaultProject = function($scope){
        Restangular.one("/api/me").get().then(function(user) {
          var idProject = user.defaultTestProject;
          Restangular.one("/api/testProject/"+idProject).get().then(function(projectManagement) {
            $rootScope.$emit('dashboard.service:tmTreeData', projectManagement.tmTreeData);
          },function (res) {
            $scope.reqErr.allowed = false;
            $scope.reqErr.status = res.status;
            $scope.reqErr.message = res.data.message;
          });
        },function (res) {
          $scope.reqErr.allowed = false;
          $scope.reqErr.status = res.status;
          $scope.reqErr.message = res.data.message;
        });
      };
 }]);
