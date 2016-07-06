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
    controller: [function() {}],
    templateUrl: 'views/dashboard/navbar/navbar.html'
  };
});
