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
      $scope.nodeFound = undefined;

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
      $scope.tmTreeHandler = function(selectedBranch){
        $rootScope.selectedBranch = selectedBranch;
        $rootScope.$emit('test-management-tree.directive:branch-' + selectedBranch.type);
      };

      //new ts branch
      $rootScope.$on('panel.controller:closeModal', function($event, newTest, type) {
        tree.add_branch($rootScope.selectedBranch, {
          label: newTest.name,
          type: type,
          _id: newTest._id,
          children: []
        });
        tree.expand_branch();
        TestProjectCrudService.updateTmTreeDataTestProject($scope, $rootScope.currentTpj._id, JSON.stringify($scope.tmTreeData));
      });

      $scope.findInTree = function(treeData, idToFind){
        var children;
  			for (var i in treeData){
  				children = treeData[i].children;
  				if (children != undefined && children.length != 0){
  					$scope.findInTree(children, idToFind);
  				}
          console.log(treeData[i].label+","+treeData[i]._id+", "+idToFind);
  				if (treeData[i]._id === idToFind){
            //TODO fix: LOS IDS NO COINCIDEN
  					$scope.nodeFound = treeData[i];
  				}
  			}
      };

      //Select a branch by id
      $rootScope.$on('test-management-find-result.directive:selectInTreeAndOpenPanel', function($event, idToFind) {
        $scope.findInTree($scope.tmTreeData,idToFind);
        if ($scope.nodeFound !== undefined){
          tree.select_branch($scope.nodeFound);
        }
      });


    }],
    templateUrl: 'views/dashboard/test-management-tree/test-management-tree.html'
  };
});
