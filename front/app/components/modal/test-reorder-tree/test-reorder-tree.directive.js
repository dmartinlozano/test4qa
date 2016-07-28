'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:alert
 * @description
 * # alert
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('testReorderTree', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'UserService', 'TestProjectCrudService', 'Restangular', '$q', function($scope, $rootScope, UserService, TestProjectCrudService, Restangular, $q) {

      $scope.uiTree = [];
      $scope.abnTree = [];
      $scope.reqErr = {};
      $scope.tcHasChildren = false;

      String.prototype.replaceAll = function (find, replace) {
          var str = this;
          return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      };

      //Open modal with tree
      $rootScope.$on('test-management-tree.directive:reorderTests', function($event, abnTree) {
        var uiTreeString = JSON.stringify(abnTree).replaceAll('"label"','"title"').replaceAll('"_id"','"id"').replaceAll('"children"','"nodes"');
        $scope.uiTree=JSON.parse(uiTreeString);
        $('#testReorderTreeModal').modal('show');
      });

      //Check if a tc has children
      $scope.checkIfTCHasChildren = function(treeData){
        var nodes;
        for (var i in treeData){
          nodes = treeData[i].nodes;
          if (treeData[i].type === "tc" && nodes !== undefined && nodes.length !== 0){
            $scope.reqErr.showError = true;
            $scope.reqErr.message = "The test case "+treeData[i].title+" contains nodes";
            $scope.tcHasChildren = true;
          };
          if (nodes !== undefined && nodes.length !== 0){
            $scope.checkIfTCHasChildren(nodes);
          };
        };
      };

      //Update correct uid and parent_ui
      $scope.fixUid = function(treeData){
        for (var i in treeData){
          if (treeData[i].nodes !== undefined && treeData[i].nodes.length !== 0){
            for (var j in treeData[i].nodes){
              treeData[i].nodes.parent_ui = treeData[i].uid;
            };
            $scope.fixUid(treeData[i].nodes);
          };
        };
      };

      //Behavoir of the tree
      $scope.treeOptions = {
             dropped: function(e){
               //Check if a tc has children
               $scope.tcHasChildren = false;
               $scope.reqErr.showError = false;
               $scope.checkIfTCHasChildren($scope.uiTree );
               if ($scope.uiTree[0].type !== 'tpj'){
                 $scope.reqErr.showError = true;
                 $scope.reqErr.message = "The first node must be the test project";
                 $scope.tcHasChildren = true;
               }
             }
           };

      //Send to tree of test management
      $scope.change = function(){
        //Transform to abnTree
        $scope.fixUid($scope.uiTree);
        var abnTreeString = JSON.stringify($scope.uiTree).replaceAll('"title"','"label"').replaceAll('"id"','"_id"').replaceAll('"nodes"','"children"');
        $rootScope.$emit('dashboard.service:tmTreeData', abnTreeString);
        TestProjectCrudService.updateTmTreeDataTestProject($rootScope.currentTpj._id, abnTreeString)
        .then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
        $('#testReorderTreeModal').modal('hide');
      };

    }],
    templateUrl: 'views/modal/test-reorder-tree/test-reorder-tree.html'
  };
});
