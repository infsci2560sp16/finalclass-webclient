'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('LoginCtrl', ['$window', '$scope', '$location', '$mdDialog', 'loginService',
    function ($window, $scope, $location, $mdDialog, loginService) {
      $scope.data = {
        email: null,
        password: null
      };
      $scope.loginUser = function (ev) {
        loginService.login($scope.data.email, $scope.data.password).then(function (d) {
          /*
          Android Code
          if (json != null) {
                      try {
                          String jsonstr = json.getString("response");
                          if (json.getBoolean("res")) {
                              String token = json.getString("token");
                              String grav = json.getString("grav");
                              SharedPreferences.Editor edit = pref.edit();
                              //Storing Data using SharedPreferences
                              edit.putString("token", token);
                              edit.putString("grav", grav);
                              edit.commit();
                              Intent profactivity = new Intent(Login.this, Profile.class);
  
                              startActivity(profactivity);
                              finish();
                          }
  
                          Toast.makeText(getApplication(), jsonstr, Toast.LENGTH_LONG).show();
  
                      } catch (JSONException e) {
                          e.printStackTrace();
                      }
                  }
          */
          console.log(d.status);
          if (d.data !== null && d.data.res === true) {
            $window.sessionStorage.accessToken = d.data.token;
            $window.sessionStorage.grav = d.data.grav;  
            $location.path( '/profile');          
          } else {
              // Appending dialog to document.body to cover sidenav in docs app
              // Modal dialogs should fully cover application
              // to prevent interaction outside of dialog
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#container')))
                  .clickOutsideToClose(true)
                  .title('Login Error')
                  .textContent(d.data.response || 'Unknown Error')
                  .ariaLabel('Login Error')
                  .ok('OK')
                  .targetEvent(ev)
              );
          }
        });
      };
      $scope.register = function (ev) {
        loginService.register($scope.data.email, $scope.data.password).then(function (d) {                    
          console.log(d.status);
          if (d.data !== null && d.data.res === true) {
            $window.sessionStorage.accessToken = d.data.token;
            $window.sessionStorage.grav = d.data.grav;  
            $location.path( '/profile');          
          } else {
              // Appending dialog to document.body to cover sidenav in docs app
              // Modal dialogs should fully cover application
              // to prevent interaction outside of dialog
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#container')))
                  .clickOutsideToClose(true)
                  .title('Login Error')
                  .textContent(d.data.response || 'Unknown Error')
                  .ariaLabel('Login Error')
                  .ok('OK')
                  .targetEvent(ev)
              );
          }
        });
      };
      $scope.forgotPassword = function (ev) {
        console.log('clicked forgotPassword()');
      };
    }]);
