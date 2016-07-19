'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('stepsAddEdit', function() {
  return {
    restrict: 'E',
    controller: ['$scope', '$rootScope', 'TestCaseCrudService', function($scope, $rootScope, TestCaseCrudService) {

      $scope.newStep = true;
      $scope.index; //used only in edition mode
      $scope.step;

      //get testCase to add new step
      $rootScope.$on('steps.directive.newStep:testCase', function($event, testCase) {
        $scope.step = {};
        $scope.newStep = true;
        $scope.testCase = testCase;
      });

      //get testCase to edit a step
      $rootScope.$on('steps.directive.editStep:testCase', function($event, testCase, index) {
        $scope.newStep = false;
        $scope.testCase = testCase;
        $scope.index = index;
        $scope.step = testCase.steps[index];
      });

      $scope.addEditStep = function(){
        if ($scope.newStep === true){
          //New step
          $scope.testCase.steps.push($scope.step);
        }else{
          //Edit step
          $scope.testCase.steps[$scope.index] = $scope.step;
        }
        TestCaseCrudService.updateTestCase ($scope, $scope.testCase._id,'steps',$scope.testCase.steps);
        $('#stepsAddEditModal').modal('hide');
      }


    }],
    templateUrl: 'views/modal/steps/steps-add-edit.html'
  };
});
