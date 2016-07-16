'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('tpjPanel', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', function($scope, $rootScope, TestProjectCrudService) {

      //show panel of tpj
      $rootScope.$on('test-management-tree.directive:branch-tpj', function($event) {
        $('#tpjPanel').show();
        $('#tsPanel').hide();
        $('#tcPanel').hide();
        TestProjectCrudService.getTestProject($scope, $rootScope.selectedBranch._id);
      });

      //Show modal to new test suite from test project
      $scope.newTestSuite = function(testProject){
        $rootScope.$emit('tpj-panel.directive:newTestSuite', $rootScope.selectedBranch._id);
      };

      //Show modal to new test suite from test project
      $scope.newTestCase = function(testProject){
        $rootScope.$emit('tpj-panel.directive:newTestCase', $rootScope.selectedBranch._id);
      };


    }],
    templateUrl: 'views/dashboard/tpj-panel/tpj-panel.html'
  };
});
