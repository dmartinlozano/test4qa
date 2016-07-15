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

      $scope.currentBranch;

      //show panel of tpj
      $rootScope.$on('test-management-tree.directive:branch-tpj', function($event, branch) {
        $('#tmPane').show();
        $scope.currentBranch = branch;
        TestProjectCrudService.getTestProject($scope, branch._id);
      });

      //Show modal to new test suite from test project
      $scope.newTestSuite = function(testProject){
        $rootScope.$emit('tpj-panel.directive:newTestSuite', $scope.currentBranch);
      };

    }],
    templateUrl: 'views/dashboard/tpj-panel/tpj-panel.html'
  };
});
