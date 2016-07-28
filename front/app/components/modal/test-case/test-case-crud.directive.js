'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('testCaseCrudAdd', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'Restangular', 'TestCaseCrudService', function($scope, $rootScope, Restangular, TestCaseCrudService) {

      $scope.isNewTestCase = true;
      $scope.testCase = {};
      $scope.testCaseName; //only in edit mode. Is $scope.testCase.name without tpj prefix
      var tpjPrefix; //onlin in edit mode. Store the tpj prefix

      //New test case
      $rootScope.$on('tpj-panel.directive:newTestCase', function($event, parentId){
        $scope.isNewTestCase = true;
        $scope.testCase = {};
        fillPrioritiesAndStatus();
      });

      //Edit TestCase
      $rootScope.$on('tc-panel.directive:editTestCase', function($event, testCase){
        $scope.isNewTestCase = false;
        $scope.testCase = testCase;
        tpjPrefix = $scope.testCase.name.split("] ")[0];
        $scope.testCaseName = $scope.testCase.name.split("] ")[1];
        fillPrioritiesAndStatus();
      });

      //Fill priorities and status dropdown
      function fillPrioritiesAndStatus(){
        Restangular.one("/api/testProject/" + $rootScope.currentTpj._id).get().then(function(projectTest) {
          $scope.priorities = projectTest.priorities;
          $scope.status = projectTest.status;
          if ($scope.isNewTestCase === true){
            //create mode
            $("#priorityDropdownMenu").find('.btn').html('Priority <span class="caret"></span>');
            $("#statusDropdownMenu").find('.btn').html('Status <span class="caret"></span>');
            $('#newTCKeywords').tokenfield('setTokens', ',');
          }else{
            //edit mode
            if ($scope.testCase.priority !== undefined){
              $("#priorityDropdownMenu").find('.btn').html($scope.testCase.priority + ' <span class="caret"></span>');
            }
            if ($scope.testCase.status !== undefined){
              $("#statusDropdownMenu").find('.btn').html($scope.testCase.status + ' <span class="caret"></span>');
            }
            $('#newTCKeywords').tokenfield('setTokens', $scope.testCase.keywords);
          };
          $("#testCaseAddModal").modal('show');
        },function (res) {
          $rootScope.$emit('alert', "The current user hasn't defined a default project");
        });
      };

      //The selected value in dropbox must be showed in dropdown
      $("#priorityDropdownMenu").on('click', 'li a', function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $scope.testCase.priority= $(this).text();
      });

      //The selected value in dropbox must be showed in dropdown
      $("#statusDropdownMenu").on('click', 'li a', function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $scope.testCase.status= $(this).text();
      });

      //The new TS has been added y tree must be added too:
      $scope.closeModalToAdd = function(){
          $("#testCaseAddModal").modal('hide');
          $rootScope.$emit('panel.controller:closeModal', $scope.testCase, 'tc');
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
        $scope.testCase.keywords = $('#newTCKeywords').val();
        $scope.testCase.parent = $rootScope.selectedBranch._id;
        $scope.testCase.tpjId = $rootScope.currentTpj._id;
        TestCaseCrudService.addTestCase($scope, $scope.testCase);
      };

      //Edit TestCase
      $scope.updateTestCase = function(){
        $scope.testCase.keywords = $('#newTCKeywords').val();
        $scope.testCase.name = tpjPrefix+"] "+$scope.testCaseName;
        TestCaseCrudService.updateTestCase($scope, $scope.testCase);
        $rootScope.$emit('test-case-crud.directive:updateTestCase', $scope.testCase);
        $("#testCaseAddModal").modal('hide');
      };
    }],
    templateUrl: 'views/modal/test-case/test-case-crud-add.html'
  };
});
