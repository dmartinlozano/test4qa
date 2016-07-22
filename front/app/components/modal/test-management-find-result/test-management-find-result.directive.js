'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:alert
 * @description
 * # alert
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('testManagementFindResult', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {

      $scope.searchString;
      $scope.findResults = [];

      $rootScope.$on('test-management-find.service:find', function($event, searchString, findResults) {
        $scope.searchString = searchString;
        $scope.findResults = findResults;
        $("#testManagementFindResultModal").modal('show');
      });

      $scope.selectInTreeAndOpenPanel = function(idToFind){
        $("#testManagementFindResultModal").modal('hide');
        $rootScope.$emit('test-management-find-result.directive:selectInTreeAndOpenPanel',idToFind);
      };

    }],
    templateUrl: 'views/modal/test-management-find-result/test-management-find-result.html'
  };
});
