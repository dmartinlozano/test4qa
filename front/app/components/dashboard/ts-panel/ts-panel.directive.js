'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('tsPanel', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    templateUrl: 'views/dashboard/ts-panel/ts-panel.html'
  };
});
