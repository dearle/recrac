angular.module('App')
.directive('eventDirective', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: function ($scope, userService) {
      userService
        .authenticate()
        .then(function (user) { $scope.user = user });
    },
    templateUrl: '../templates/event.html'
  };
});
