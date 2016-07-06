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
    }],
    templateUrl: 'views/dashboard/navbar/navbar.html'
  };
});
