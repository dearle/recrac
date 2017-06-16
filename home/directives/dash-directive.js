angular.module('App')
.directive('dashDirective', function() {
  return {
    scope: {
        user: '<'
    },
    restrict: 'E',
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '../templates/dash.html'
  };
});
