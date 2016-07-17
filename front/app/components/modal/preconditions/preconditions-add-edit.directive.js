'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('preconditionsAddEdit', function() {
  return {
    restrict: 'E',
    controller: ['$scope', '$rootScope', 'TestCaseCrudService', function($scope, $rootScope, TestCaseCrudService) {

      $scope.newPrecondition = true;
      $scope.index; //used only in edition mode
      $scope.precondition;

      $scope.$watch('isDisplayed', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log('Changed!: '+newValue, oldValue);
            console.log('ops:!: '+$scope.isDisplayed);
        }
      });

      //get testCase to add new precondition
      $rootScope.$on('preconditions.directive.newPrecondition:testCase', function($event, testCase) {
        $scope.newPrecondition = true;
        $scope.testCase = testCase;
      });

      //get testCase to edit a precondition
      $rootScope.$on('preconditions.directive.editPrecondition:testCase', function($event, testCase, index) {
        $scope.newPrecondition = false;
        $scope.testCase = testCase;
        $scope.index = index;
        $scope.precondition = testCase.preconditions[index];
      });

      $scope.addEditPrecondition = function(){
        if ($scope.newPrecondition === true){
          //New precondition
          $scope.testCase.preconditions.push($scope.precondition);
        }else{
          //Edit precondition
          $scope.testCase.preconditions[$scope.index] = $scope.precondition;
        }
        TestCaseCrudService.updateTestCase ($scope, $scope.testCase._id,'preconditions',$scope.testCase.preconditions);
        $('#preconditionsAddEditModal').modal('hide');
      }


    }],
    templateUrl: 'views/modal/preconditions/preconditions-add-edit.html'
  };
});
