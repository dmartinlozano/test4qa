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
    $scope.newTC = {};

    //Show Modal new tc
    $rootScope.$on('tpj-panel.directive:newTestCase', function($event) {
      $('#testCaseAddModal').modal('show');
    });

    //The new TS has been added y tree must be added too:
    $scope.closeModal = function(){
        $("#testCaseAddModal").modal('hide');
        $rootScope.$emit('panel.controller:closeModal', $scope.newTC, 'tc');
    };

    var newTcEngine = new Bloodhound({
      local: [],
      datumTokenizer: function(d) {
        return Bloodhound.tokenizers.whitespace(d.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    newTcEngine.initialize();

    $('#newTCKeywords').tokenfield({typeahead: [null,{source: newTcEngine.ttAdapter()}]});

    //Add a new testcase
    $scope.addTestCase = function(){
      $scope.newTC.keywords = $('#newTCKeywords').val();
      $scope.newTC.parent = $rootScope.selectedBranch._id;
      TestCaseCrudService.addTestCase($scope, $scope.newTC);
    }

    //show panel of tc
    $rootScope.$on('test-management-tree.directive:branch-tc', function($event) {
      $('#tpjPanel').hide();
      $('#tsPanel').hide();
      $('#tcPanel').show();
      TestCaseCrudService.getTestCase($scope, $rootScope.selectedBranch._id);
    });

    //Show modal to new test case from test project
    $scope.newTestCase = function(testCase){
      $rootScope.$emit('ts-panel.directive:newTestCase', $rootScope.selectedBranch);
    };

  }
]);
