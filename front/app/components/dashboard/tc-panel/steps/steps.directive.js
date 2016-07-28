'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('steps', function() {
  return {
    restrict: 'E',
    scope: {
      testCase: "="
    },
    replace: true,
    controller: ['$scope', '$rootScope', 'TestCaseCrudService', function($scope, $rootScope, TestCaseCrudService) {

      //The last down button must be disabled
      $scope.disableLastDownButton = function(index){
        var maxLength = $scope.testCase.steps.length - 1;
        return (index < maxLength) ? false : true;
      }
      //Add step
      $scope.newStep = function(){
        $('#stepsAddEditModal').modal('show');
        $rootScope.$emit('steps.directive.newStep:testCase', $scope.testCase);
      };

      //Add step
      $scope.editStep = function(index){
        $('#stepsAddEditModal').modal('show');
        $rootScope.$emit('steps.directive.editStep:testCase', $scope.testCase, index);
      };

      //Delete step
      $scope.deleteStep = function(index){
        $scope.testCase.steps.splice(index, 1);
        TestCaseCrudService.updateFieldTestCase($scope.testCase._id,'steps',$scope.testCase.steps).
        then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      }

      //Up step
      $scope.upStep = function(index){
        var previousPred = $scope.testCase.steps[index - 1];
        $scope.testCase.steps[index -1] = $scope.testCase.steps[index];
        $scope.testCase.steps[index] =previousPred;
        TestCaseCrudService.updateFieldTestCase($scope.testCase._id,'steps',$scope.testCase.steps).
        then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      }

      //Down step
      $scope.downStep = function(index){
        var nextPred = $scope.testCase.steps[index + 1];
        $scope.testCase.steps[index + 1] = $scope.testCase.steps[index];
        $scope.testCase.steps[index] = nextPred;
        TestCaseCrudService.updateFieldTestCase($scope.testCase._id,'steps',$scope.testCase.steps).
        then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      }

    }],
    templateUrl: 'views/dashboard/tc-panel/steps/steps.html'
  };
});
