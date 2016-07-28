'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.controller:TsController
 * @description
 * # TsController
 * Controller of the test4qaApp
 */
angular.module('test4qaApp')
.controller('TcController', ['$rootScope', '$scope', '$state', 'TestCaseCrudService', 'DialogConfirmService',
  function ($rootScope, $scope, $state, TestCaseCrudService, DialogConfirmService) {

    $scope.reqErr = {};

    //show panel of tc
    $rootScope.$on('test-management-tree.directive:branch-tc', function($event) {
      $('#tpjPanel').hide();
      $('#tsPanel').hide();
      $('#tcPanel').show();
      TestCaseCrudService.getTestCase($scope, $rootScope.selectedBranch._id);
    });

    //Edit current TestCase
    $scope.editTestCase = function(){
      $rootScope.$emit('tc-panel.directive:editTestCase', $scope.testCase);
    };

    //Delete current TestCase
    $scope.deleteTestCase = function(){
      $scope.config = ["Are you sure?", "Do you want delete the selected test case?", "Accept", "Cancel"];
      DialogConfirmService.openDialogModal($scope.config).then(function (isOk) {
        if (isOk){
          TestCaseCrudService.deleteTestCase($scope, $scope.testCase._id);
          $rootScope.$emit('tc-panel.controller:deleteTestCase', $scope.testCase);
        };
      });
    };

  }
]);
