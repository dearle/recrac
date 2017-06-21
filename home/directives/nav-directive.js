angular.module('App')
.directive('navDirective', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/nav.html'
  };
});
