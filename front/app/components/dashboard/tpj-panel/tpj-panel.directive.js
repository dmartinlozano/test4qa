'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('tpjPanel', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', 'DialogConfirmService', 'Restangular', '$uibModal', function($scope, $rootScope, TestProjectCrudService, DialogConfirmService, Restangular, $uibModal) {

      //show panel of tpj
      $rootScope.$on('test-management-tree.directive:branch-tpj', function($event) {
        $('#tpjPanel').show();
        $('#tsPanel').hide();
        $('#tcPanel').hide();
        TestProjectCrudService.getTestProject($scope, $rootScope.selectedBranch._id);
      });

      //Show modal to new test project
      $scope.newTestProject = function(){
          $rootScope.$emit('tpj-panel.directive:newTestProject');
      };

      //Show modal to edit test project
      $scope.editTestProject = function(){
          $rootScope.$emit('tpj-panel.directive:editTestProject', $scope.testProject);
      };

      //Show modal to new test suite from test project
      $scope.newTestSuite = function(){
        $rootScope.$emit('tpj-panel.directive:newTestSuite', $rootScope.selectedBranch._id);
      };

      //Show modal to new test suite from test project
      $scope.newTestCase = function(){
        $rootScope.$emit('tpj-panel.directive:newTestCase', $rootScope.selectedBranch._id);
      };

      //Delete a test project
      $scope.deleteTestProject = function(){

        //Dialog config
        $scope.config = ["Are you sure?", "Do you want delete the selected test project?", "Accept", "Cancel"];
        DialogConfirmService.openDialogModal($scope.config).then(function (isOk) {
          if (isOk){
              TestProjectCrudService.deleteTestProject($scope, $rootScope.selectedBranch._id);
              Restangular.one("/api/me").get().then(function(user) {
                $rootScope.$emit('test-project-crud.directive:hidden.bs.modal');
                $rootScope.$emit('navbar.controler:changeProject', user.defaultTestProject);
                $rootScope.$emit('test-project-crud.directive:deleteTestProject', $scope.testProject);
              });
          };
        });
      };

      //Show modal to reorder tree of test manager
      $scope.reorderTests = function(){
        $rootScope.$emit('tpj-panel.directive:reorderTests');
      };
    }],
    templateUrl: 'views/dashboard/tpj-panel/tpj-panel.html'
  };
});
