angular.module('App')
.directive('cardDirective', ['$http', function($http) {
  return {
    restrict: 'E',
    controller: function ($scope) {
      // console.log('CD SCOPE', $scope.event._id)
    },
    templateUrl: '../templates/card.html'
  };
}]);

