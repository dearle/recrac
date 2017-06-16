angular.module('App')

.controller('loginCtrl', function(auth) {
    this.login = auth;
})

.directive('loginDirective', function() {
  return {
    scope: {},
    restrict: 'E',
    controllerAs: 'loginCtrl',
    bindToController: true,
    templateUrl: '../templates/login.html'
  };
});