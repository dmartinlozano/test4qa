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
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {

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
        $rootScope.$emit('test-management-tree.directive:branch', branch);
      };

    }],
    templateUrl: 'views/dashboard/test-management-tree/test-management-tree.html'
  };
});
