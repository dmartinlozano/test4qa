'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('testManagementTree', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', function($scope, $rootScope, TestProjectCrudService) {

      var tree;
      $scope.tmTreeControl = tree = {};
      $scope.tmTreeData = [];

      //print tm tree
      $rootScope.$on('dashboard.service:tmTreeData', function($event, tmTreeData) {
        $scope.tmTreeData = eval(tmTreeData);
      });

      //collapseTmTree
      $rootScope.$on('test-management-find.directive:collapseTmTree', function() {
        $scope.tmTreeControl.collapse_all();
      });

      //expandTmTree
      $rootScope.$on('test-management-find.directive:expandTmTree', function() {
        $scope.tmTreeControl.expand_all();
      });

      //select a branch
      $scope.tmTreeHandler = function(branch){
        $rootScope.$emit('test-management-tree.directive:branch-' + branch.type, branch);
      };

      //new ts branch
      $rootScope.$on('ts-panel.controller:closeModal', function($event, branch, newTS) {
        tree.add_branch(branch, {
          label: newTS.name,
          type: 'ts',
          _id: newTS._id,
          children: []
        });
        tree.expand_branch();
        TestProjectCrudService.updateTestProject($scope, $rootScope.currentTpj._id, 'tmTreeData', JSON.stringify($scope.tmTreeData));
      });

    }],
    templateUrl: 'views/dashboard/test-management-tree/test-management-tree.html'
  };
});
