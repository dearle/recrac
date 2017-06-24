angular.module('App')
.directive('cardDirective', ['$http', function($http) {
  return {
    restrict: 'E',
    controller: function ($scope) {},
    templateUrl: '../templates/card.html'
  };
}]);

