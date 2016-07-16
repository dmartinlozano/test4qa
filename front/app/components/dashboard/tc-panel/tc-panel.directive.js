'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('tcPanel', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    templateUrl: 'views/dashboard/tc-panel/tc-panel.html'
  };
});
