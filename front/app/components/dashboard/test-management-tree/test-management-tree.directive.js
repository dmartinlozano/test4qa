'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('test-management-tree', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {

      //Filter activities for mobile
      $scope.filterActivities= function(element){
        $scope.popover.hide();
        $rootScope.$emit('filterAndFindActivities', element.target.getAttribute("value"), "");
      };

    }],
    templateUrl: 'views/dashboard/test-management-tree/test-management-tree2.html'
  };
});
