'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:usersCrud
 * @description
 * # usersCrud
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('rolesCrud', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'RoleService', function($scope, $rootScope, RoleService) {

      //Init users when modal is show
      $rootScope.$on('role-management.directive:shown.bs.modal', function() {
        $scope.roles = [];
        RoleService.getAllRoles($scope);
        window.setTimeout(function(){
          $(window).resize();
        }, 1000);
      });

      //Delete an user
      $scope.deleteRole = function(id){
        RoleService.deleteRole($scope, id);
      };

      //Init ngGrid for users
      $scope.roleCrudGridOptions = {
        data: 'roles',
        enableCellEditOnFocus: true,
        columnDefs: [{field:'name', displayName: 'Name'},
                     {field:'description', displayName:'Description'},
                     {field:'isAdmin', displayName: 'Is admin', enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.isAdmin"  ng-click="grid.appScope.clickIsAdminCheckBox(row.entity)">'},
                     {field: 'delete', enableCellEdit: false, cellTemplate: '<button class="btn btn-default fa fa-times-circle" ng-click="grid.appScope.deleteRole(row.entity._id)" ></button>'}]
      };

      //when the table is editing
      $scope.roleCrudGridOptions.onRegisterApi = function(gridApi) {
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue) {
            RoleService.updateRole($scope,rowEntity._id,colDef.field,newValue);
        });
      };

      //When isAdmin column is click:
      $scope.clickIsAdminCheckBox = function(rowEntity){
        RoleService.updateRole($scope,rowEntity._id,'isAdmin',rowEntity.isAdmin);
      }

      //Open add a new roles  modal
      $scope.openAddRoleModal = function(){
        $('#userManagementModal').modal("hide");
        $('#roleAddModal').modal('show');
      };
    }],
    templateUrl: 'views/modal/user/role/role-crud.html'
  };
})

.directive('roleCrudAdd', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'RoleService', function($scope, $rootScope, RoleService) {

      $scope.newRole = {};
      $scope.newRole.isAdmin = false;

      //A new role
      $scope.addRole = function(){
        RoleService.addRole($scope, $scope.newRole);
      };

      //Close current modal and show userModal
      $scope.closeModal = function(){
        $('#roleAddModal').modal("hide");
        $('#userManagementModal').modal('show');
      };


    }],
    templateUrl: 'views/modal/user/role/role-crud-add.html'
  };
});
