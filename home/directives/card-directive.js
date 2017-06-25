angular.module('App')
.directive('cardDirective', ['$http', function($http) {
  return {
    restrict: 'E',

    controller: function ($scope, $http) {
        $scope.joinEventHandler = function(joinedEventId) {
            $http.put('/events', {eventData: joinedEventId}, {contentType: 'application/json'})
            .then(function (response) {
                console.log('Update Successful: ', response);  
            })
            .catch(function (err) {
                console.error('Update Failed: ', err);
            });
        };

    },
    templateUrl: '../templates/card.html'
  };
}]);