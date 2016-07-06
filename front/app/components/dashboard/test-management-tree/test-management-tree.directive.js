'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('testManagementTree', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {

$scope.tmTreeData = [];
      //print tree
      $rootScope.$on('dashboard.service:tmTreeData', function($event, tmTreeData) {
        $scope.tmTreeData = tmTreeData;
        //https://github.com/nickperkinslondon/angular-bootstrap-nav-tree/issues/13
      });

    }],
    templateUrl: 'views/dashboard/test-management-tree/test-management-tree.html'
  };
});
