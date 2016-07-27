'use strict';

/**
 * @ngdoc function
 * @name testingItApp.controller:TsController
 * @description
 * # TsController
 * Controller of the testingItApp
 */
angular.module('testingItApp')
.controller('TsController', ['$rootScope', '$scope', '$state', 'TestSuiteCrudService', 'DialogConfirmService',
  function ($rootScope, $scope, $state, TestSuiteCrudService, DialogConfirmService) {

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
     $scope.config = ["Are you sure?", "Do you want delete the selected test case?", "Accept", "Cancel"];
     DialogConfirmService.openDialogModal($scope.config).then(function (isOk) {
       if (isOk){
           TestSuiteCrudService.deleteTestSuite($scope, $scope.testSuite._id);
           $rootScope.$emit('ts-panel.controller:deleteTestSuite', $scope.testSuite);
       };
     });

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
