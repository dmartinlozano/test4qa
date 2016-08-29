'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('userDefaultProject', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'DashboardService', 'TestProjectCrudService', 'UserService', 'RoleService', 'TpjRolesService', 'Restangular', function($scope, $rootScope, DashboardService, TestProjectCrudService, UserService, RoleService, TpjRolesService, Restangular) {

      //Fill priorities and status dropdown

        $scope.tPjSelected = undefined;
        $scope.roleSelected = undefined;

        TestProjectCrudService.getAllProjects().then(function(testProjects){
          $scope.testProjects = testProjects;
        }).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });

        RoleService.getAllRoles().then(function(roles){
          $scope.roles = roles;
        }).catch(function(res){
          $rootScope.$emit('alert', "The current user hasn't defined a default project");
        });

        //The selected value in dropdown must be showed in dropdown
        $("#tpjDropdownMenu").on('click', 'li a', function(){
          $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        });

        //The selected value in dropdown must be showed in dropdown
        $("#roleDropdownMenu").on('click', 'li a', function(){
          $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        });

        //On select dropdown
        $scope.changeProject = function(tpjId){
          $scope.tPjSelected = tpjId;
        };

        //On select dropdown
        $scope.changeRole = function(roleId){
          $scope.roleSelected = roleId;
        };

        //when accept button is disabled
        $scope.acceptButtonDisabled = function(){
          if ($scope.tPjSelected === undefined || $scope.roleSelected === undefined){
            return true;
          }else{
            return false;
          }
        };

        //Close modal
        $scope.closeModal = function(){
          Restangular.one("/api/me").get().then(function(user){
            //Update defaultTestProject
            UserService.updateUser(user._id, "defaultTestProject", $scope.tPjSelected)
            .then(function(){}).catch(function(res){
              $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
            });
            //Update roleInProject
            TpjRolesService.updateOrAddRolesByProjects(user._id, $scope.tPjSelected, $scope.roleSelected)
            .then(function(){}).catch(function(res){
              $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
            });
          });
          DashboardService.getTMTreeFromDefaultProject();
          $('#userDefaultProjectModal').modal('hide');
        };

    }],
    templateUrl: 'views/modal/user-default-project/user-default-project.html'
  };
});
