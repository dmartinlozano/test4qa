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

      //Open add a new users  modal
      $scope.openAddTestProjectRoleModal = function(){
        $('#userManagementModal').modal("hide");
        $('#userTpjRoleAddModal').modal('show');
      };

    }],
    templateUrl: 'views/modal/user/test-project-roles/test-project-roles.html'
  };
})

.directive('testProjectRolesAdd', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'UserService', 'TestProjectCrudService', 'RoleService', function($scope, $rootScope, UserService, TestProjectCrudService, RoleService) {

      $scope.newUserTpjRole = {};

      //Load test projects for dropdown
      $('#userTpjRoleAddModal').on('shown.bs.modal', function() {
        UserService.getAllUsers($scope);
        TestProjectCrudService.getAllProjects($scope);
        RoleService.getAllRoles($scope);

        $scope.newUserTpjRole = {};
        $('#userInTestProjectDropDown').find('.btn').html('Users <span class="caret"></span>');
        $('#tpjInTestProjectDropDown').find('.btn').html('Test projects <span class="caret"></span>');
        $('#roleInTestProjectDropDown').find('.btn').html('Roles <span class="caret"></span>');
      });


      //A new user
      $scope.addUserTpjRole = function(){
        UserService.addUserTpjRole($scope, $scope.newUserTpjRole);
      };

      //Close current modal and show userModal
      $scope.closeModal = function(){
        $('#userTpjRoleAddModal').modal("hide");
        $('#userManagementModal').modal('show');
      };

      //The selected value in dropbox must be showed in dropdown
      $("#userInTestProjectDropDown").on('click', 'li a', function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $scope.newUserTpjRole.name= $(this).attr('value');
      });

      //The selected value in dropbox must be showed in dropdown
      $("#tpjInTestProjectDropDown").on('click', 'li a', function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $scope.newUserTpjRole.project= $(this).attr('value');
      });

      //The selected value in dropbox must be showed in dropdown
      $("#roleInTestProjectDropDown").on('click', 'li a', function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $scope.newUserTpjRole.role= $(this).attr('value');
      });


    }],
    templateUrl: 'views/modal/user/test-project-roles/test-project-roles-add.html'
  };
});
