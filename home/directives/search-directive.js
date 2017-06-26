angular.module('App')
  .directive('searchDirective', function() {
    return {
      restrict: 'E',
      scope: {},
      controller: function ($scope, searchServices, mappingTools) {
        $scope.filters = searchServices.filters;
        $scope.filterObj = searchServices.filterObj;
        $scope.toggleLayer = mappingTools.toggleLayer.bind($scope);
      },  
      templateUrl: '../templates/search.html'
    };
  });
