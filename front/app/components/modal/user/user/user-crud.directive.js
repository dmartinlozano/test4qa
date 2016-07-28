'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:usersCrud
 * @description
 * # usersCrud
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('usersCrud', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'UserService', 'TestProjectCrudService', 'DialogConfirmService', 'Restangular', function($scope, $rootScope, UserService, TestProjectCrudService, DialogConfirmService, Restangular) {

      $scope.edit = true;
      $scope.canEdit = function() { return $scope.edit; };

      //Init users when modal is show
      $rootScope.$on('user-management.directive:shown.bs.modal', function() {
        $scope.users = [];
        //To read in a combo in ng-grid
        UserService.getAllUsers()
        .then(function(users){
          $scope.users = users;
        })
        .catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });

        TestProjectCrudService.getAllProjects().then(function(testProjects){
          $scope.testProjects = testProjects;
          $scope.userCrudGridOptions.columnDefs[4].editDropdownOptionsArray = testProjects;
        }).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
        $scope.loadPermissions($scope.userCrudGridOptions);
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
              $scope.edit = false;
            }
          },function (res) {
              $rootScope.$emit('alert', "The current user hasn't defined a default project");
          });
        };

      //Delete an user
      $scope.deleteUser = function(entity){

        $scope.config = ["Are you sure?", "Do you want delete the selected user?", "Accept", "Cancel"];
        DialogConfirmService.openDialogModal($scope.config).then(function (isOk) {
          if (isOk){
              UserService.deleteUser(entity._id).then(function(){}).catch(function(res){
                $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
                UserService.getAllUsers()
                .then(function(users){
                  $scope.users = users;
                })
                .catch(function(res){
                  $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
                });
              });
          };
        });
      };

      //Init uiGrid for users
      $scope.userCrudGridOptions = {
        data: 'users',
        enableCellEditOnFocus: true,
        columnDefs: [{field:'name', displayName: 'Name', cellEditableCondition : $scope.canEdit },
                     {field:'firstName', displayName:'First Name', cellEditableCondition : $scope.canEdit },
                     {field:'lastName', displayName: 'Last Name', cellEditableCondition : $scope.canEdit },
                     {field:'email', displayName: 'Email', cellEditableCondition : $scope.canEdit},
                     {field:'defaultTestProject',
                      displayName: 'Test Project',
                      editableCellTemplate: 'ui-grid/dropdownEditor',
                      editDropdownOptionsArray: $scope.testProjects,
                      editDropdownIdLabel: '_id',
                      editDropdownValueLabel: 'name',
                      cellFilter: 'testProjectsFilter:grid.appScope.testProjects',
                      cellEditableCondition : $scope.canEdit },
                     {field: 'delete', enableCellEdit: false, cellEditableCondition : $scope.canEdit , cellTemplate: '<button class="btn btn-default fa fa-times-circle" ng-click="grid.appScope.deleteUser(row.entity)" ng-disabled="!grid.appScope.edit"></button>'}]
      };

      //when the table is editing
      $scope.userCrudGridOptions.onRegisterApi = function(gridApi) {
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue) {
            UserService.updateUser($scope,rowEntity._id,colDef.field,newValue)
            .then(function(){})
            .catch(function(res){
              $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
            });
        });
      };

      //Open add a new users  modal
      $scope.openAddUserModal = function(){
        $('#userManagementModal').modal("hide");
        $('#userAddModal').modal('show');
      };
    }],
    templateUrl: 'views/modal/user/user/user-crud.html'
  };
})

.directive('userCrudAdd', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'UserService', 'TestProjectCrudService', function($scope, $rootScope, UserService, TestProjectCrudService) {

      $scope.newUser = {};

      //The selected value in dropbox must be showed in dropdown
      $("#testProjectInUserCrudDropDown").on('click', 'li a', function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
      });

      //A new user
      $scope.addUser = function(){
        UserService.addUser($scope.newUser)
        .then(function(){
          $scope.closeModal();
        })
        .catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      };

      //Close current modal and show userModal
      $scope.closeModal = function(){
        $('#userAddModal').modal("hide");
        $('#userManagementModal').modal('show');
      };

      //Load test projects for dropdown
      $('#userAddModal').on('shown.bs.modal', function() {
        TestProjectCrudService.getAllProjects().then(function(testProjects){
          $scope.testProjects = testProjects;
        }).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });
      });

      //Store de selected project
      $scope.setSelectedTestProjectInUserCrudDropDown = function(projectId){
        $scope.newUser.defaultTestProject= projectId;
      };


    }],
    templateUrl: 'views/modal/user/user/user-crud-add.html'
  };
});
