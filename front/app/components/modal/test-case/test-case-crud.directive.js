'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('testCaseCrud', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    templateUrl: 'views/modal/test-case/test-case-crud.html'
  };
})

.directive('testCaseCrudAdd', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },templateUrl: 'views/modal/test-case/test-case-crud-add.html'
  };
});
