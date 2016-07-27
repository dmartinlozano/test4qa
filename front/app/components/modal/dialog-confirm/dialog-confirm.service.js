'use strict';

/**
 * @ngdoc function
 * @name testingItApp.service:DashboardService
 * @description
 * # DashboardService
 * Servie of the testingItApp
 */
angular.module('testingItApp')
.service('DialogConfirmService', function(Restangular, $uibModal, $q) {

      this.openDialogModal = function(paramsConfig) {
          var defered = $q.defer();
          var promise = defered.promise;
          var previousModals = $('.modal.in');

          //Store previous bootstrap modals (if exists)
          if (previousModals.length > 0){
            for (i in previousModals){
              previousModals.modal('hide');
            };
          };

          //Open Dialog config
          var modalInstance = $uibModal.open({
            templateUrl: 'views/modal/dialog-confirm/dialog-confirm.html',
            controller: 'DialogConfirmController',
            size: "sm",
            resolve: {
              config: function () {
                return paramsConfig;
              }
            }
          });

          //Check if button ok or ko has been pressed
          modalInstance.result.then(function (isOk) {
            //Restore modals
            if (previousModals.length > 0){
              for (i in previousModals){
                previousModals.modal('show');
              };
            };
            if (isOk){
              defered.resolve(isOk);
            };
          }, function () {});

          return promise;
      };

});
