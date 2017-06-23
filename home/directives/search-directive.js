angular.module('App')
.directive('searchDirective', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/search.html'
  };
});
