'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:alert
 * @description
 * # alert
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('changePassword', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'UserService', 'Restangular', function($scope, $rootScope, UserService, Restangular) {
      $scope.reqErr = {};
      $scope.reqErr.error = false;

      $scope.change = function(indexSelected){
         if ($scope.password1 !== $scope.password2){
           $scope.reqErr.message = "The passwords are not the same";
           $scope.reqErr.error = true;
         }else{
           Restangular.one("/api/me").get().then(function(user) {
             UserService.updateUser($scope, user._id,'password',$scope.password1);
             $('#changePasswordModal').modal("hide");
           });

         }
      };

    }],
    templateUrl: 'views/modal/change-password/change-password.html'
  };
});
