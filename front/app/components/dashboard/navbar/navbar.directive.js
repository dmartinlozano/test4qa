'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:navbar
 * @description
 * # navbar
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('navbar', function() {
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
    templateUrl: 'views/dashboard/navbar/navbar.html'
  };
});
