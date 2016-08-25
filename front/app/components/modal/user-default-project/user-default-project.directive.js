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
    controller: ['$scope', '$rootScope', 'TestProjectCrudService', 'UserService', 'Restangular', function($scope, $rootScope, TestProjectCrudService, UserService, Restangular) {

      //Fill priorities and status dropdown

        $scope.tPjSelected = undefined;

        TestProjectCrudService.getAllProjects().then(function(testProjects){
          $scope.testProjects = testProjects;
        }).catch(function(res){
          $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
        });

        //The selected value in dropdown must be showed in dropdown
        $("#tpjDropdownMenu").on('click', 'li a', function(){
          $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        });

        //On select dropdown
        $scope.changeProject = function(tpjId){
          $scope.tPjSelected = tpjId;
        };

        //Close modal
        $scope.closeModal = function(){
          Restangular.one("/api/me").get().then(function(user){
            UserService.updateUser(user._id, "defaultTestProject", $scope.tPjSelected)
            .then(function(){})
            .catch(function(res){
              $rootScope.$emit('alert', '[' + res.status + '] ' + res.data.message);
            });
          });
          $('#userDefaultProjectModal').modal('hide');
        };

    }],
    templateUrl: 'views/modal/user-default-project/user-default-project.html'
  };
});
