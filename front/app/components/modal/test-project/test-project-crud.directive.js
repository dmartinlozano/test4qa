'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the testingItApp
 */

angular.module('testingItApp')
.directive('testProjectCrudAdd', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', function($scope, $rootScope, TestProjectCrudService) {

      $scope.isNewTestProject = true;
      $scope.testProject = {};

      //New test project: open modal
      $rootScope.$on('tpj-panel.directive:newTestProject', function() {
        $scope.isNewTestProject = true;
        $scope.testProject = {};
        $('#testProjectAddModal').modal('show');
      });

      //New test project: open modal
      $rootScope.$on('tpj-panel.directive:editTestProject', function($event, testProject) {
        $scope.isNewTestProject = false;
        $scope.testProject = testProject;
        $('#newPriorities').tokenfield('setTokens', $scope.testProject.priorities);
        $('#newStatus').tokenfield('setTokens', $scope.testProject.status);
        $('#testProjectAddModal').modal('show');
      });

      //A new test project
      $scope.addTestProject = function(){
        $scope.testProject.priorities = $('#newPriorities').val();
        $scope.testProject.status = $('#newStatus').val();
        TestProjectCrudService.addTestProject($scope, $scope.testProject);
      };

      //Edit test project
      $scope.editTestProject = function(){
        $scope.testProject.priorities = $('#newPriorities').val();
        $scope.testProject.status = $('#newStatus').val();
        TestProjectCrudService.updateTestProject($scope, $scope.testProject);
        $rootScope.$emit('test-project-crud.directive:editTestProject', $scope.testProject);
        $scope.closeModal();
      };

      //Close current modal
      $scope.closeModal = function(){
        $('#testProjectAddModal').modal("hide");
        $rootScope.$emit('test-project-crud.directive:hidden.bs.modal');
      };

      var newTcEngine = new Bloodhound({
        local: [],
        datumTokenizer: function(d) {
          return Bloodhound.tokenizers.whitespace(d.value);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace
      });

      newTcEngine.initialize();

      $('#newPriorities').tokenfield({typeahead: [null,{source: newTcEngine.ttAdapter()}]});
      $('#newStatus').tokenfield({typeahead: [null,{source: newTcEngine.ttAdapter()}]});

    }],
    templateUrl: 'views/modal/test-project/test-project-crud-add-edit.html'
  };
});
