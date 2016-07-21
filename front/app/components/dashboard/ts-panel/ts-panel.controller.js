'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:TsController
 * @description
 * # TsController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
.controller('TsController', ['$rootScope', '$scope', '$state', 'TestSuiteCrudService',
  function ($rootScope, $scope, $state, TestSuiteCrudService) {

    $scope.reqErr = {};

    //show panel of ts
    $rootScope.$on('test-management-tree.directive:branch-ts', function($event) {
      $('#tpjPanel').hide();
      $('#tsPanel').show();
      $('#tcPanel').hide();
      TestSuiteCrudService.getTestSuite($scope, $rootScope.selectedBranch._id);
    });

    var newTsEngine = new Bloodhound({
      local: [],
      datumTokenizer: function(d) {
        return Bloodhound.tokenizers.whitespace(d.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    newTsEngine.initialize();

    $('#newTSKeywords').tokenfield({typeahead: [null,{source: newTsEngine.ttAdapter()}]});

    //Show modal to edit Test Suite
    $scope.editTestSuite = function(){
      $rootScope.$emit('ts-panel.directive:editTestSuite', $scope.testSuite);
    };

    //Delete current TestSuite
   $scope.deleteTestSuite = function(){
     TestSuiteCrudService.deleteTestSuite($scope, $scope.testSuite._id);
   };

    //Show modal to new test suite from test project
    $scope.newTestSuite = function(){
      $rootScope.$emit('tpj-panel.directive:newTestSuite', $rootScope.selectedBranch);
    };

    //Show modal to new test case from test project
    $scope.newTestCase = function(){
      $rootScope.$emit('tpj-panel.directive:newTestCase', $rootScope.selectedBranch);
    };

  }
]);
