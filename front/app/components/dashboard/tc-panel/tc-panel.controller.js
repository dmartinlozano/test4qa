'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:TsController
 * @description
 * # TsController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
.controller('TcController', ['$rootScope', '$scope', '$state', 'TestCaseCrudService',
  function ($rootScope, $scope, $state, TestCaseCrudService) {

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
      TestCaseCrudService.deleteTestCase($scope, $scope.testCase._id);
    };

  }
]);
