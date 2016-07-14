'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('tpjPanel', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', function($scope, $rootScope, TestProjectCrudService) {

      //show panel of tpj
      $rootScope.$on('test-management-tree.directive:branch', function($event, branch) {
        $('#tmPane').show();
        TestProjectCrudService.getTestProject($scope, branch._id);
      });

    }],
    templateUrl: 'views/dashboard/tpj-panel/tpj-panel.html'
  };
});
