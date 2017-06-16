angular.module('App')
.directive('homeDirective', function() {
  return {
    scope: {
        user: '<'
    },
    restrict: 'E',
    controller: function($scope, $state, $timeout, ParseService, CurrentUser) {
      
    },
    controllerAs: 'homeCtrl',
    bindToController: true,
    templateUrl: '../templates/home.html'
  };
});
