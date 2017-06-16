angular.module('App')

.directive('loginDirective', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: function() {},
    controllerAs: 'loginCtrl',
    bindToController: true,
    templateUrl: '../templates/login.html'
  };
});