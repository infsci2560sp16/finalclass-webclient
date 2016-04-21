'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the webClientApp
 */
function DialogController($scope, $window, $mdDialog, loginService) {
  $scope.oldPassword = "";
  $scope.newPassword = "";
  
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.changePassword = function(ev) {
    loginService.changePassword($scope.oldPassword, $scope.newPassword, $window.sessionStorage.accessToken).success(function (data, status) {
      $mdDialog.hide();
      if (data === null || data.res === false) {
              // Appending dialog to document.body to cover sidenav in docs app
              // Modal dialogs should fully cover application
              // to prevent interaction outside of dialog
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#container')))
                  .clickOutsideToClose(true)
                  .title('Error')
                  .textContent(data.response || 'Unknown Error')
                  .ariaLabel('Error')
                  .ok('OK')
                  .targetEvent(ev)
              );
          }
    });
    
  };
}

angular.module('webClientApp')
  .controller('ProfileCtrl', ['$window', '$scope', '$location', '$mdDialog', function ($window, $scope, $location, $mdDialog) {
    $scope.accessToken = $window.sessionStorage.accessToken;
    $scope.grav = $window.sessionStorage.grav;
    
    $scope.changePassword = function(ev) {
      console.log('clicked changePassword()');
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'views/partials/change-password.tmpl.html',
        parent: angular.element(angular.element(document.querySelector('#container'))),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });      
    };
    
    $scope.logout = function() {
      console.log('clicked logout()');      
      $window.sessionStorage.accessToken = null;
      $window.sessionStorage.grav = null;  
      $location.path( '/login'); 
    };
  }]);