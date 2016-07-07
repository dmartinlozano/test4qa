'use strict';

/**
 * @ngdoc function
 * @name testingItApp.directive:testManagementFind
 * @description
 * # testManagementFind
 * Directive of the testingItApp
 */
angular.module('testingItApp')
.directive('testProjectCrud', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', 'NavbarService', function($scope, $rootScope, NavbarService) {

      $scope.myData = [{name: "Moroni", age: 49},
                           {name: "Tiancum", age: 43},
                           {name: "Jacob", age: 27},
                           {name: "Nephi", age: 29},
                           {name: "Enos", age: 34}];

      $scope.testProjectCrudGridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{field: 'name', displayName: 'Name', enableCellEdit: true},
                     {field:'age', displayName:'Age', enableCellEdit: true}]
      };




    }],
    templateUrl: 'views/modal/test-project/test-project-crud.html'
  };
});
