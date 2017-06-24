angular.module('App')
.directive('searchDirective', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: function ($scope, searchServices) {
      $scope.filters =[{"name":"Job", id:1}, {name:"Class", id:2}, {name:"Food", id:3}, {name:"Party", id:4}];
      $scope.myFilters = {
        selected:{}
      }; //all selected filters updated by clicking fliters

      filter = function(filters) {
        searchServices.filterAll(filters)
      }
    },  
    templateUrl: '../templates/search.html'
  };
});
