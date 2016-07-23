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
    controller: ['$scope', '$rootScope', 'RoleService', 'Restangular', function($scope, $rootScope, RoleService, Restangular) {

      $scope.edit = true;
      $scope.canEdit = function() { return $scope.edit; };

      //Init users when modal is show
      $rootScope.$on('role-management.directive:shown.bs.modal', function() {
        $scope.roles = [];
        RoleService.getAllRoles($scope);
        $scope.loadPermissions($scope.roleCrudGridOptions);
        window.setTimeout(function(){
          $(window).resize();
        }, 1000);
      });

      //Put table how readOnly if not permissions
      $scope.loadPermissions = function(gridOptions){
          var tpjId = "-";
          if ($rootScope.currentTpj !== undefined ){
            if ($rootScope.currentTpj._id !== undefined){
              tpjId = $rootScope.currentTpj._id;
            }
          }
          Restangular.one("/api/permission/"+tpjId+"/userManagementEdit").get().then(function(permission) {
            if (permission === true){
              $scope.edit = true;
            }else{
              $scope.edit= false;
            }
          },function (res) {
              $rootScope.$emit('alert', "The current user hasn't defined a default project");
          });
        };

      //Delete an user
      $scope.deleteRole = function(id){
        RoleService.deleteRole($scope, id);
      };

      //Init ngGrid for users
      $scope.roleCrudGridOptions = {
        data: 'roles',
        enableCellEditOnFocus: true,
        columnDefs: [{field:'name', displayName: 'Name', cellEditableCondition : $scope.canEdit},
                     {field:'description', displayName:'Description', cellEditableCondition : $scope.canEdit},
                     {field:'isAdmin', displayName: 'Is admin', cellEditableCondition : $scope.canEdit, enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.isAdmin"  ng-click="grid.appScope.clickIsAdminCheckBox(row.entity)" ng-disabled="!grid.appScope.edit">'},
                     {field: 'delete', enableCellEdit: false, cellEditableCondition : $scope.canEdit, cellTemplate: '<button class="btn btn-default fa fa-times-circle" ng-click="grid.appScope.deleteRole(row.entity._id)" ng-disabled="!grid.appScope.edit"></button>'}]
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
