'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:usersCrud
 * @description
 * # usersCrud
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('permissionsCrud', function() {
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

        RoleService.getAllRoles().then(function(roles){
          $scope.roles = roles;
        }).catch(function(res){
          $rootScope.$emit('alert', "The current user hasn't defined a default project");
        });
        
        $scope.loadPermissions($scope.permissionsCrudGridOptions);
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

      //Init ngGrid for users
      $scope.permissionsCrudGridOptions = {
        data: 'roles',
        enableCellEditOnFocus: true,
        columnDefs: [{field:'name', displayName: 'Role', cellEditableCondition : $scope.canEdit},
                     {field:'permissions.testManagementView', displayName: 'View Test Management', enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.permissions.testManagementView"  ng-disabled="!grid.appScope.edit" ng-click="grid.appScope.clickCheckBox(row.entity)">'},
                     {field:'permissions.testManagementEdit', displayName: 'Edit Test Management', enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.permissions.testManagementEdit" ng-disabled="!grid.appScope.edit"  ng-click="grid.appScope.clickCheckBox(row.entity)">'},
                     {field:'permissions.testPlanView', displayName: 'View Test Plan', enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.permissions.testPlanView"  ng-disabled="!grid.appScope.edit" ng-click="grid.appScope.clickCheckBox(row.entity)">'},
                     {field:'permissions.testPlanEdit', displayName: 'Edit Test Plan', enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.permissions.testPlanEdit"  ng-disabled="!grid.appScope.edit" ng-click="grid.appScope.clickCheckBox(row.entity)">'},
                     {field:'permissions.testPlanRun', displayName: 'Run Test Plan', enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.permissions.testPlanRun"  ng-disabled="!grid.appScope.edit" ng-click="grid.appScope.clickCheckBox(row.entity)">'},
                     {field:'permissions.userManagementView', displayName: 'View User Management', enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.permissions.userManagementView"  ng-disabled="!grid.appScope.edit" ng-click="grid.appScope.clickCheckBox(row.entity)">'},
                     {field:'permissions.userManagementEdit', displayName: 'Edit User Management', enableCellEdit: false, cellTemplate: '<input type="checkbox" ng-model="row.entity.permissions.userManagementEdit"  ng-disabled="!grid.appScope.edit" ng-click="grid.appScope.clickCheckBox(row.entity)">'}]
      };

      //when the table is editing
      $scope.permissionsCrudGridOptions.onRegisterApi = function(gridApi) {
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue) {
            RoleService.updateRole(rowEntity._id, colDef.field, newValue).then(function(){}).catch(function(err){
              $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
            });
        });
      };

      //When TestManagementViewcolumn is click:
      $scope.clickCheckBox = function(rowEntity){
        RoleService.updateRole(rowEntity._id,'permissions', rowEntity.permissions).then(function(){}).catch(function(err){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      }
    }],
    templateUrl: 'views/modal/user/permissions/permissions-crud.html'
  };
});
