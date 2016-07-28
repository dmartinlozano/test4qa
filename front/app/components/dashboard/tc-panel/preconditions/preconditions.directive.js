'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:test-management-tree
 * @description
 * # test-management-tree
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('preconditions', function() {
  return {
    restrict: 'E',
    scope: {
      testCase: "="
    },
    replace: true,
    controller: ['$scope', '$rootScope', 'TestCaseCrudService', function($scope, $rootScope, TestCaseCrudService) {

      //The last down button must be disabled
      $scope.disableLastDownButton = function(index){
        var maxLength = $scope.testCase.preconditions.length - 1;
        return (index < maxLength) ? false : true;
      }
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
        TestCaseCrudService.updateFieldTestCase($scope.testCase._id,'preconditions',$scope.testCase.preconditions).
        then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      }

      //Up precondition
      $scope.upPrecondition = function(index){
        var previousPred = $scope.testCase.preconditions[index - 1];
        $scope.testCase.preconditions[index -1] = $scope.testCase.preconditions[index];
        $scope.testCase.preconditions[index] =previousPred;
        TestCaseCrudService.updateFieldTestCase($scope.testCase._id,'preconditions',$scope.testCase.preconditions).
        then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      }

      //Down precondition
      $scope.downPrecondition = function(index){
        var nextPred = $scope.testCase.preconditions[index + 1];
        $scope.testCase.preconditions[index + 1] = $scope.testCase.preconditions[index];
        $scope.testCase.preconditions[index] = nextPred;
        TestCaseCrudService.updateFieldTestCase($scope.testCase._id,'preconditions',$scope.testCase.preconditions).
        then(function(){}).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      }

    }],
    templateUrl: 'views/dashboard/tc-panel/preconditions/preconditions.html'
  };
});
