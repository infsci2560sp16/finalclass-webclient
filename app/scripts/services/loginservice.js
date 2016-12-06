'use strict';

/**
 * @ngdoc service
 * @name webClientApp.loginService
 * @description
 * # loginService
 * Service in the webClientApp.
 */
var serverUrl = 'https://bk-final.herokuapp.com/';

angular.module('webClientApp')
  .service('loginService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.login = function (email, password) {
      var url = serverUrl + 'login';      
      return $http.post(url, {email: email, password: password });
    };

    this.register = function (email, password) {
      var url = serverUrl + 'register';      
      return $http.post(url, {email: email, password: password });
    };
    
    this.changePassword = function(oldpass, newpass, id) {
     var url = serverUrl + 'api/chgpass';
     return $http.post(url, {oldpass: oldpass, newpass:newpass, id: id});
    };
  }]);
