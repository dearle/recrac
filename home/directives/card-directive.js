angular.module('App')
.directive('cardDirective', ['$http', function($http) {
  return {
    restrict: 'E',
    controller: function ($scope) {
      // $scope.styles = {
      //   'Job': {
      //     color: '#fff',
      //     background-image: "url(https:'./pic/job.jpg'), bottom right 15%, no-repeat #46B6AC"
      //   },
      //   "Class": {
      //     color: '#fff',
      //     background: "url(https:'./pic/class.jpg'), bottom right 15%, no-repeat #46B6AC"
      //   },
      //   "Food": {
      //     color: '#fff',
      //     background: "url(https:'./pic/food.jpg') bottom right 15% no-repeat #46B6AC"
      //   },
      //   "Party": {
      //     color: '#fff',
      //     background: "url(https:'./pic/party.jpg') bottom right 15% no-repeat #46B6AC"
      //   }

      // }

    },
    templateUrl: '../templates/card.html'
  };
}]);