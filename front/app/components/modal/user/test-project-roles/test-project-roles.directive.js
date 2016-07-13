'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:usersCrud
 * @description
 * # usersCrud
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('tpjRolesCrud', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'UserService', 'TestProjectCrudService', 'RoleService', function($scope, $rootScope, UserService, TestProjectCrudService, RoleService) {

      //Init ui-grid when tab is selected

      $rootScope.$on('user-management.directive:shown.bs.modal', function() {
      //$rootScope.$on('user-management.directive:changeTab', function(event, tab) {
      //  if (tab === "tpjRoles"){
          $scope.userRolesTpj = [];
          UserService.getRolesByProjects($scope, $scope.userRoleTpjGridOptions);
          TestProjectCrudService.getAllProjects($scope);
          TestProjectCrudService.getAllProjectsForDropDown(3, $scope.userRoleTpjGridOptions);
          RoleService.getAllRoles($scope);
          RoleService.getAllRolesForDropDown(4, $scope.userRoleTpjGridOptions);

          window.setTimeout(function(){
            $(window).resize();
          }, 1000);
      //  }
      });

      //Init uiGrid for users
      $scope.userRoleTpjGridOptions = {
        data: 'userRolesTpj',
        enableCellEditOnFocus: true,
        columnDefs: [{field: 'id', visible:false},
                     {field: 'userId', visible:false},
                     {field:'user', displayName: 'User', enableCellEdit: false},
                     {field:'project',
                      displayName: 'Test Project',
                      editableCellTemplate: 'ui-grid/dropdownEditor',
                      editDropdownOptionsArray: $scope.testProjects,
                      editDropdownIdLabel: '_id',
                      editDropdownValueLabel: 'name',
                      cellFilter: 'testProjectsFilter:grid.appScope.testProjects'},
                     {field:'role', displayName: 'Roles',
                      editableCellTemplate: 'ui-grid/dropdownEditor',
                      editDropdownOptionsArray: $scope.testProjects,
                      editDropdownIdLabel: '_id',
                      editDropdownValueLabel: 'name',
                      cellFilter: 'testProjectsFilter:grid.appScope.roles'},
                     {field: 'delete', enableCellEdit: false, cellTemplate: '<button class="btn btn-default fa fa-times-circle" ng-click="grid.appScope.deleteRolesByProjects(row.entity)" ></button>'}]
      };

      //when the table is editing
      $scope.userRoleTpjGridOptions.onRegisterApi = function(gridApi) {
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue) {
            UserService.updateRolesByProjects($scope,rowEntity.userId, rowEntity.id, colDef.field, newValue);
        });
      };

      //Delete an user
      $scope.deleteRolesByProjects = function(rowEntity){
        UserService.deleteRolesByProjects($scope, rowEntity.userId, rowEntity.id);
      };

    }],
    templateUrl: 'views/modal/user/test-project-roles/test-project-roles.html'
  };
});
