'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('preconditions', function() {
  return {
    restrict: 'E',
    scope: {
      testCase: "="
    },
    replace: true,
    controller: ['$scope', '$rootScope', 'TestCaseCrudService', function($scope, $rootScope, TestCaseCrudService) {

      //Add precondition
      $scope.newPrecondition = function(){
        $('#preconditionsAddEditModal').modal('show');
        $rootScope.$emit('preconditions.directive.newPrecondition:testCase', $scope.testCase);
      };

      //Add precondition
      $scope.editPrecondition = function(index){
        $('#preconditionsAddEditModal').modal('show');
        $rootScope.$emit('preconditions.directive.editPrecondition:testCase', $scope.testCase, index);
      };

      //Delete precondition
      $scope.deletePrecondition = function(index){
        $scope.testCase.preconditions.splice(index, 1);
        TestCaseCrudService.updateTestCase ($scope, $scope.testCase._id,'preconditions',$scope.testCase.preconditions);
      }

      //Up precondition
      $scope.upPrecondition = function(index){
        var previousPred = $scope.testCase.preconditions[index - 1];
        $scope.testCase.preconditions[index -1] = $scope.testCase.preconditions[index];
        $scope.testCase.preconditions[index] =previousPred;
        TestCaseCrudService.updateTestCase ($scope, $scope.testCase._id,'preconditions',$scope.testCase.preconditions);
      }

      //Down precondition
      $scope.downPrecondition = function(index){
        var nextPred = $scope.testCase.preconditions[index + 1];
        $scope.testCase.preconditions[index + 1] = $scope.testCase.preconditions[index];
        $scope.testCase.preconditions[index] = nextPred;
        TestCaseCrudService.updateTestCase ($scope, $scope.testCase._id,'preconditions',$scope.testCase.preconditions);
      }

    }],
    templateUrl: 'views/dashboard/tc-panel/preconditions/preconditions.html'
  };
});
