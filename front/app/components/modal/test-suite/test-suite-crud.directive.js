'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('testSuiteCrud', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'NavbarService', 'TestProjectCrudService', function($scope, $rootScope, NavbarService, TestProjectCrudService) {


    }],
    templateUrl: 'views/modal/test-suite/test-suite-crud.html'
  };
})

.directive('testSuiteCrudAdd', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', function($scope, $rootScope, TestProjectCrudService) {}],
    templateUrl: 'views/modal/test-suite/test-suite-crud-add.html'
  };
});
