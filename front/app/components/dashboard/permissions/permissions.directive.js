'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:preconditions
 * @description
 * # preconditions
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('permissions', function($rootScope, Restangular, PermissionsService) {

  var permissions = {};
  permissions.tpjId = undefined;
  permissions.components = [];

  //Function to load a permission from the current user, current pjt, and a component
  var loadPermissions = function($scope, element, attributes){
    var component = attributes.permissions;
    var tpjId = "-";
    if ($rootScope.currentTpj !== undefined ){
      if ($rootScope.currentTpj._id !== undefined){
        tpjId = $rootScope.currentTpj._id;
      }
    }

    //Check first in cache:
    if (permissions.tpjId == undefined || permissions.tpjId !== tpjId){
      permissions.tpjId = tpjId;
    }
    if (permissions.components[component] !== undefined){
      if (permissions.components[component] === true){
        element.show();
      }else{
        element.hide();
      }
    }else{
      //permission not stored in cache.
      PermissionsService.getPermissions(permissions.tpjId, component)
      .then(function(permission){
        if (permission === true){
          permissions.components[component] = true;
          element.show();
        }else{
          permissions.components[component] = false;
          element.hide();
        }
      }).catch(function(res){
        $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
      });
    }
  };


  function link( $scope, element, attributes ) {
    //When the user change the projectTest, the permissions must be reloaded
    $scope.$watch('currentTpj._id', function (newValue, oldValue){
      loadPermissions($scope, element, attributes );
    });
    //When tpjPanel change, the permissions must be reloaded
    $rootScope.$on('test-management-tree.directive:branch-tpj', function($event) {
      loadPermissions($scope, element, attributes );
    });
    //When tpjPanel change, the permissions must be reloaded
    $rootScope.$on('test-management-tree.directive:branch-tpj', function($event) {
      loadPermissions($scope, element, attributes );
    });
    //When user management modal change, the permissions must be reloaded for edit
    $("#userManagementModal").on('shown.bs.modal', function() {
      loadPermissions($scope, element, attributes );
    });
    //Initial permissions:
    loadPermissions($scope, element, attributes );
  }
  return({
    restrict: "A",
    link: link
  });
});
