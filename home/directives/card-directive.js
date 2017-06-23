angular.module('App')

.directive('cardDirective', ['$http', function($http) {
  return {
    scope: {},
    restrict: 'E',
    controller: function ($scope) {
    },
    templateUrl: '../templates/card.html'
  };
}]);