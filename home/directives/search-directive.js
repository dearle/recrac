angular.module('App')
.directive('searchDirective', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: function ($scope, searchServices) {
      $scope.filters = searchServices.filters;
      $scope.filterObj = searchServices.filterObj;
    },  
    templateUrl: '../templates/search.html'
  };
});
