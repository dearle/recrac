angular.module('App')
.directive('loginDirective', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: function ($scope, userService) {
      userService
        .authenticate()
        .then(function (user) { 
          $scope.user = user 
    },
    templateUrl: '../templates/login.html'
  };
});