'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.controller:navbar
 * @description
 * # navbar
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('navbar', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    templateUrl: 'views/dashboard/navbar/navbar.html'
  };
});
