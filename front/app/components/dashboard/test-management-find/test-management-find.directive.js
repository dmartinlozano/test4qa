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
    controller: ['$scope', '$rootScope', 'FindService', function($scope, $rootScope, FindService) {
      
      $scope.toFindInTmTree = "";

      $scope.findInTmTree = function(){
        FindService.find($scope, $scope.toFindInTmTree);
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
