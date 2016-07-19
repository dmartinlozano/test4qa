'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the testingItApp
 */
angular.module('testingItApp')

.service('DashboardService', ['Restangular', '$rootScope', '$state', function(Restangular, $rootScope, $state) {


  //return tmTreeData of defaultTestProject of user
  this.getTMTreeFromDefaultProject = function(){
        Restangular.one("/api/me").get().then(function(user) {
          //Session lost or back rest:
          if (user === undefined){
            $state.go('login');
          }

          $rootScope.currentTpj = {};
          $rootScope.currentTpj._id = user.defaultTestProject;

          Restangular.one("/api/testProject/" + $rootScope.currentTpj._id).get().then(function(projectManagement) {
            $rootScope.currentTpj.name = projectManagement.name;
            $rootScope.currentTpj.prefix = projectManagement.prefix;
            $rootScope.currentTpj.currentTcNumber = projectManagement.currentTcNumber;
            $rootScope.$emit('dashboard.service:tmTreeData', projectManagement.tmTreeData);
          },function (res) {
            $rootScope.$emit('alert', "The current user hasn't defined a default project");
          });
        },function (res) {
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

    //Change project
    $rootScope.$on('navbar.controler:changeProject', function($event, projectId) {
      Restangular.one("/api/testProject/" + projectId).get().then(function(projectManagement) {
        $rootScope.currentTpj._id = projectManagement._id;
        $rootScope.currentTpj.name = projectManagement.name;
        $rootScope.currentTpj.prefix = projectManagement.prefix;
        $rootScope.currentTpj.currentTcNumber = projectManagement.currentTcNumber;
        $('#tpjPanel').hide();
        $('#tsPanel').hide();
        $('#tcPanel').hide();
        $rootScope.$emit('dashboard.service:tmTreeData', projectManagement.tmTreeData);
      },function (res) {
        $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
      });
    });
 }]);
