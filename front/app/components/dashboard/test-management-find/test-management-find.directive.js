'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('testManagementFind', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TreeService', function($scope, $rootScope, TreeService) {

      $scope.toFindInTmTree = "";

      $scope.findInTmTree = function(){
        TreeService.findInTmTree($scope.toFindInTmTree).then(function(findResults){
          $rootScope.$emit('test-management-find.service:find', $scope.toFindInTmTree, findResults);
        }).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

      $scope.collapseTmTree = function(){
        $rootScope.$emit('test-management-find.directive:collapseTmTree');
      };

      $scope.expandTmTree = function(){
        $rootScope.$emit('test-management-find.directive:expandTmTree');
      };

    }],
    templateUrl: 'views/dashboard/test-management-find/test-management-find.html'
  };
});
