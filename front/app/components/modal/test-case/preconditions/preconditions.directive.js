'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('preconditions', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    templateUrl: 'views/modal/test-case/preconditions/preconditions.html'
  };
});
