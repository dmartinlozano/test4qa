'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('testProjectCrud', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'NavbarService', 'TestProjectCrudService', function($scope, $rootScope, NavbarService, TestProjectCrudService) {

      //TODO Fix error grid in modal:
    /*  $('#testProjectCrudModal').on('shown.bs.modal', function() {
        var class = $('#testProjectCrudModal').children().attr('class');
        $('#testProjectCrudModal')children().css('class', 'modal-dialog');
        $('#testProjectCrudModal')children().css('class', class);
      });*/


      //Init test projects when modal is show
      $('#testProjectCrudModal').on('shown.bs.modal', function() {
        $scope.testProjects = [];
        TestProjectCrudService.getAllProjects($scope);
      });

      //modal is closed
      $('#testProjectCrudModal').on('hidden.bs.modal', function() {
        $rootScope.$emit('test-project-crud.directive:hidden.bs.modal');
      });

      //Init ngGrid for test projects
      $scope.testProjectCrudGridOptions = {
        data: 'testProjects',
        enableCellEditOnFocus: true,
        columnDefs: [{field:'name', displayName: 'Name'},
                     {field:'prefix', displayName:'Prefix'},
                     {field:'description', displayName: 'Description'},
                     {field: 'delete',enableCellEdit: false, cellTemplate: '<button class="btn btn-default fa fa-times-circle" ng-click="grid.appScope.deleteProject(row.entity._id)" ></button>'}]
      };

      //when the table is editing
      $scope.testProjectCrudGridOptions.onRegisterApi = function(gridApi) {
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue) {
            TestProjectCrudService.updateTestProject($scope,rowEntity._id,colDef.field,newValue);
        });
      };

      //Open add a new test project  modal
      $scope.openAddProjectModal = function(){
        $('#testProjectCrudModal').modal("hide");
        $('#testProjectAddModal').modal('show');
      };

      //Delete a test project
      $scope.deleteProject = function(id){
        TestProjectCrudService.deleteTestProject($scope, id);
      }
    }],
    templateUrl: 'views/modal/test-project/test-project-crud.html'
  };
})

.directive('testProjectCrudAdd', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', function($scope, $rootScope, TestProjectCrudService) {

      //A new test project
      $scope.addTestProject = function(){
        TestProjectCrudService.addTestProject($scope, $scope.name, $scope.prefix, $scope.description);
      };

      //Close current modal and show testProjectCrudModal
      $scope.closeModal = function(){
        $('#testProjectAddModal').modal("hide");
        $('#testProjectCrudModal').modal('show');
      };

    }],
    templateUrl: 'views/modal/test-project/test-project-crud-add.html'
  };
});
