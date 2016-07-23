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

      //Init users when modal is show
      $('#userManagementModal').on('shown.bs.modal', function() {
        $rootScope.$emit('user-management.directive:shown.bs.modal');
        $rootScope.$emit('role-management.directive:shown.bs.modal');
      });

      //modal is closed
      $('#userManagementModal').on('hidden.bs.modal', function() {
        $rootScope.$emit('user-management.directive:hidden.bs.modal');
        $rootScope.$emit('role-management.directive:hidden.bs.modal');
      });

      //When a tab is selected, refresh grid with tab
      $scope.changeTab = function(){
        window.setTimeout(function(){
          $(window).resize();
        }, 1000);
      }

    }],
    templateUrl: 'views/modal/user/user-management.html'
  };
});
