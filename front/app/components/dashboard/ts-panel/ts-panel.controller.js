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
    $scope.parentBranch;

    //Show Modal new ts
    $rootScope.$on('tpj-panel.directive:newTestSuite', function($event, parentBranch) {
      $('#testSuiteAddModal').modal('show');
      $scope.parentBranch = parentBranch;
    });

    //The new TS has been added y tree must be added too:
    $scope.closeModal = function(){
        $("#testSuiteAddModal").modal('hide');
        $rootScope.$emit('ts-panel.controller:closeModal', $scope.parentBranch, $scope.newTS);
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
      $scope.newTS.parent = $scope.parentBranch._id;
      TestSuiteCrudService.addTestSuite($scope, $scope.newTS);
    }

  }
]);
