angular.module('App')
.directive('historyDirective', function() {
  return {
    scope: {
        messages: '<'
    },
    restrict: 'E',
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '../templates/history-view.html'
  };
});