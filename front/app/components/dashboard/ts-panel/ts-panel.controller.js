'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.controller:TsController
 * @description
 * # TsController
 * Controller of the test4qaApp
 */
angular.module('test4qaApp')
.controller('TsController', ['$rootScope', '$scope', '$state', 'TestSuiteCrudService', 'DialogConfirmService',
  function ($rootScope, $scope, $state, TestSuiteCrudService, DialogConfirmService) {

    $scope.reqErr = {};

    //show panel of ts
    $rootScope.$on('test-management-tree.directive:branch-ts', function($event) {
      $('#tpjPanel').hide();
      $('#tsPanel').show();
      $('#tcPanel').hide();
      TestSuiteCrudService.getTestSuite($rootScope.selectedBranch._id)
      .then(function(testSuite){
        $scope.testSuite = testSuite;
      })
      .catch(function(res){
        $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
      });
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
           TestSuiteCrudService.deleteTestSuite($scope.testSuite._id)
            .then(function(){
              $rootScope.$emit('dashboard:deleteRecursive');
            })
            .catch(function(res){
              $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
            });
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
