'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('testManagementTree', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', 'TreeService', function($scope, $rootScope, TestProjectCrudService, TreeService) {

      var tree;
      $scope.tmTreeControl = tree = {};
      $scope.tmTreeData = [];
      $scope.nodeFound = undefined;

      //print tm tree
      $rootScope.$on('dashboard.service:tmTreeData', function($event, tmTreeData) {
        $scope.tmTreeData = eval(tmTreeData);
        //Select first branch if exists:
        if ($scope.tmTreeData.length > 0) {
          tree.select_branch($scope.tmTreeData[0]);
          }
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
        TestProjectCrudService.updateTmTreeDataTestProject($rootScope.currentTpj._id, JSON.stringify($scope.tmTreeData))
        .then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      });

      //Find recursively an item by id
      $scope.findInTree = function(treeData, idToFind){
        var children;
  			for (var i in treeData){
  				children = treeData[i].children;
  				if (children != undefined && children.length != 0){
  					$scope.findInTree(children, idToFind);
  				}
  				if (treeData[i]._id === idToFind){
  					$scope.nodeFound = treeData[i];
  				}
  			}
      };

      //Find recursively an item by id and rename it
      $scope.renameItemInTree = function(treeData, id, newName){
  			for (var i in treeData){
          if (treeData[i]._id === id){
            treeData[i].label = newName;
          }else{
            if (treeData[i].children != undefined && treeData[i].children.length != 0){
    					$scope.renameItemInTree(treeData[i].children, id, newName);
    				};
          };
  			};
      };

      //Find recursively an item by id and delete it
      $scope.deleteItemInTree = function(treeData, id){
        for (var i in treeData){
          if (treeData[i]._id === id){
            treeData.splice(i, 1);
          }else{
            if (treeData[i].children != undefined && treeData[i].children.length != 0){
    					$scope.deleteItemInTree(treeData[i].children, id);
    				};
          };
  			};
      }

      //Select a branch by id
      $rootScope.$on('test-management-find-result.directive:selectInTreeAndOpenPanel', function($event, idToFind) {
        $scope.findInTree($scope.tmTreeData,idToFind);
        if ($scope.nodeFound === undefined){
          $rootScope.$emit('alert', "The selected item not found in tree");
        }else{
          tree.select_branch($scope.nodeFound);
        }
      });

      //Rename tpj
      $rootScope.$on('test-project-crud.directive:editTestProject', function($event, editTestProject) {
        $scope.renameItemInTree($scope.tmTreeData, editTestProject._id, editTestProject.name);
        TestProjectCrudService.updateTmTreeDataTestProject($rootScope.currentTpj._id, JSON.stringify($scope.tmTreeData))
        .then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      });

      //Rename ts
      $rootScope.$on('test-suite-crud.directive:updateTestSuite', function($event, editTestSuite) {
        $scope.renameItemInTree($scope.tmTreeData, editTestSuite._id, editTestSuite.name);
        TestProjectCrudService.updateTmTreeDataTestProject($rootScope.currentTpj._id, JSON.stringify($scope.tmTreeData))
        .then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      });

      //Rename tc
      $rootScope.$on('test-case-crud.directive:updateTestCase', function($event, editTestCase) {
        $scope.renameItemInTree($scope.tmTreeData, editTestCase._id, editTestCase.name);
        TestProjectCrudService.updateTmTreeDataTestProject($rootScope.currentTpj._id, JSON.stringify($scope.tmTreeData))
        .then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      });

      //Send the tree to reorder:
      $rootScope.$on('tpj-panel.directive:reorderTests', function($event, idToFind) {
        $rootScope.$emit('test-management-tree.directive:reorderTests', $scope.tmTreeData);
      });

      //Delete tpj
      $rootScope.$on('test-project-crud.directive:deleteTestProject', function($event, deleteTestProject) {
        $scope.deleteItemInTree($scope.tmTreeData, deleteTestProject._id);
        TestProjectCrudService.updateTmTreeDataTestProject($rootScope.currentTpj._id, JSON.stringify($scope.tmTreeData))
        .then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      });

      //Delete tpj
      $rootScope.$on('ts-panel.controller:deleteTestSuite', function($event, deleteTestSuite) {
        $scope.deleteItemInTree($scope.tmTreeData, deleteTestSuite._id);
        TestProjectCrudService.updateTmTreeDataTestProject($rootScope.currentTpj._id, JSON.stringify($scope.tmTreeData))
        .then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      });

      //Delete tpj
      $rootScope.$on('tc-panel.controller:deleteTestCase', function($event, deleteTestCase) {
        $scope.deleteItemInTree($scope.tmTreeData, deleteTestCase._id);
        TestProjectCrudService.updateTmTreeDataTestProject($rootScope.currentTpj._id, JSON.stringify($scope.tmTreeData))
        .then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      });

      //Get subtree to delete
      $scope.getChildren = function(treeData){
        var children;
        for (var i in treeData){
          children = treeData[i].children;
          if (children != undefined && children.length != 0){
            $scope.getChildren(children);
          };
          if (treeData[i].type === "ts"){
            $scope.tsToDelete.push(treeData[i]._id);
          }
          if (treeData[i].type === "tc"){
            $scope.tcToDelete.push(treeData[i]._id);
          }
        };
      };

      //Delete subtree if exists
      $rootScope.$on('dashboard:deleteRecursive', function($event) {
        $scope.tsToDelete=[];
        $scope.tcToDelete=[];
        $scope.getChildren($rootScope.selectedBranch.children);
        if ($scope.tsToDelete.length !== 0){
          TreeService.deleteTSRecursive($scope.tsToDelete.join(","))
          .then(function(){}).catch(function(res){
            $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
          });
        };
        if ($scope.tcToDelete.length !== 0){
          TreeService.deleteTCRecursive($scope.tcToDelete.join(","))
          .then(function(){}).catch(function(res){
            $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
          });
        };
      });

    }],
    templateUrl: 'views/dashboard/test-management-tree/test-management-tree.html'
  };
});
