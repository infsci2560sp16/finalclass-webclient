'use strict';

/**
 * @ngdoc service
 * @name webClientApp.loginService
 * @description
 * # loginService
 * Service in the webClientApp.
 */
angular.module('webClientApp')
  .service('loginService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.login = function (email, password) {
      var url = 'https://immense-dawn-31145.herokuapp.com/login';      
      return $http.post(url, {email: email, password: password });
    };
    
    this.changePassword = function(oldpass, newpass, id) {
     var url = 'https://immense-dawn-31145.herokuapp.com/api/chgpass';
     return $http.post(url, {oldpass: oldpass, newpass:newpass, id: id});
    }
  }]);
