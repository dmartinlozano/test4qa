'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('testManagementFind', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {

      $scope.findInTmTree = function(){
        $rootScope.$emit('test-management-find.directive:findInTmTree', $scope.textToFindInTmTree);
        //TODO es recibido en un componente que tiene que dibujar un modal con el resultado
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
