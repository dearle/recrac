angular.module('App')
.directive('dashDirective', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: function ($scope, userService) {
      userService
        .authenticate()
        .then(function (user) { $scope.user = user });
    },
    templateUrl: '../templates/dash.html'
  };
});
