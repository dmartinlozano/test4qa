'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.directive:alert
 * @description
 * # alert
 * Directive of the test4qaApp
 */
angular.module('test4qaApp')
.directive('alert', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@',
    },
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {

      $scope.alerts = $rootScope.alerts=[];
      $rootScope.unreadAlerts = 0;

      $rootScope.$on('alert', function($event, message) {
        $rootScope.alerts.push({unread:true, message:message});
        $rootScope.unreadAlerts = $rootScope.unreadAlerts + 1;
      });

      $scope.markAsRead = function(indexSelected){
        if ($rootScope.alerts[indexSelected].unread === true){
          $rootScope.alerts[indexSelected].unread = false;
          $scope.alerts[indexSelected].unread = false;
          $rootScope.unreadAlerts = $rootScope.unreadAlerts -1;
        }
      };

      $scope.markAllAsRead = function(){
        $rootScope.alerts.forEach(function(entry) {
          entry.unread = false;
          $rootScope.unreadAlerts = $rootScope.unreadAlerts -1;
        });
      };

      $scope.deleteAll = function(){
        $scope.alerts = $rootScope.alerts=[];
        $rootScope.unreadAlerts = 0;
      };

    }],
    templateUrl: 'views/modal/alert/alert.html'
  };
});
