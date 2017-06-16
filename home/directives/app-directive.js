angular.module('App')
.directive('appDirective', function() {
  return {
    scope: {
        user: '<'
    },
    restrict: 'E',
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '../templates/home.html'
  };
});
