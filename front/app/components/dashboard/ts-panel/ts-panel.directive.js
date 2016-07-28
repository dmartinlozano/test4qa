'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('tsPanel', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    templateUrl: 'views/dashboard/ts-panel/ts-panel.html'
  };
});
