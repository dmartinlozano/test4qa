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
    $scope.newTS = {};

    //Show Modal new ts
    $rootScope.$on('tpj-panel.directive:newTestSuite', function($event) {
      $('#testSuiteAddModal').modal('show');
    });

    //The new TS has been added y tree must be added too:
    $scope.closeModal = function(){
        $("#testSuiteAddModal").modal('hide');
        $rootScope.$emit('panel.controller:closeModal', $scope.newTS, 'ts');
    };

    var newTsEngine = new Bloodhound({
      local: [],
      datumTokenizer: function(d) {
        return Bloodhound.tokenizers.whitespace(d.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    newTsEngine.initialize();

    $('#newTSKeywords').tokenfield({typeahead: [null,{source: newTsEngine.ttAdapter()}]});

    //Add a new testsuite
    $scope.addTestSuite = function(){
      $scope.newTS.keywords = $('#newTSKeywords').val();
      $scope.newTS.parent = $rootScope.selectedBranch._id;
      TestSuiteCrudService.addTestSuite($scope, $scope.newTS);
    }

    //show panel of ts
    $rootScope.$on('test-management-tree.directive:branch-ts', function($event) {
      $('#tpjPanel').hide();
      $('#tsPanel').show();
      $('#tcPanel').hide();
      TestSuiteCrudService.getTestSuite($scope, $rootScope.selectedBranch._id);
    });

    //Show modal to new test suite from test project
    $scope.newTestSuite = function(testSuite){
      $rootScope.$emit('tpj-panel.directive:newTestSuite', $rootScope.selectedBranch);
    };

    //Show modal to new test case from test project
    $scope.newTestCase = function(testCase){
      $rootScope.$emit('tpj-panel.directive:newTestCase', $rootScope.selectedBranch);
    };

  }
]);
