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
    controller: ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {

      //Init users when modal is show
      $rootScope.$on('user-management.directive:shown.bs.modal', function() {
        $scope.userRolesTpj = [];
        UserService.getRolesByProjects($scope.userRoleTpjGridOptions);
        window.setTimeout(function(){
          $(window).resize();
        }, 1000);
      });

      //Init uiGrid for users
      $scope.userRoleTpjGridOptions = {
        data: 'userRolesTpj',
        columnDefs: [{field:'user', displayName: 'User'},
                     {field:'project', displayName:'testProject'},
                     {field:'role', displayName: 'Roles'}]
      };

      //when the table is editing
      $scope.userRoleTpjGridOptions.onRegisterApi = function(gridApi) {
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue) {
            UserService.updateRolesByProjects($scope,rowEntity._id,colDef.field,newValue);
        });
      };
    }],
    templateUrl: 'views/modal/user/test-project-roles/test-project-roles.html'
  };
})


//In user management, the dropdown show the name of testProjects:
.filter('testProjectsFilter', function () {
    return function (input, map) {
        if (typeof map !== "undefined") {
            for (var i = 0; i < map.length; i++) {
                if (map[i]["_id"] == input) {
                    return map[i]["name"];
                }
            }
        }
    };
})
