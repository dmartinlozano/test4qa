'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:userManagementCrud
 * @description
 * # userManagementCrud
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('userManagementCrud', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$rootScope', '$scope', function($rootScope, $scope) {

      //TODO Fix error grid in modal

      //Init users when modal is show
      $('#userManagementModal').on('shown.bs.modal', function() {
        $rootScope.$emit('user-management.directive:shown.bs.modal');
      });

      //modal is closed
      $('#userManagementModal').on('hidden.bs.modal', function() {
        $rootScope.$emit('user-management.directive:hidden.bs.modal');
      });

    }],
    templateUrl: 'views/modal/user/user-management.html'
  };
});
