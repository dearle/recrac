angular.module('App')
.directive('cardDirective', ['$http', '$state', function($http) {
  return {
    restrict: 'E',
    controller: function ($scope, $http, $state) {
        $scope.joinEventHandler = function(joinedEvent) {
            if ($scope.user.data.user.user === joinedEvent.host) {
                console.log($scope.user.data.user.user, ' cannot join an event they are hosting');
            } 
            else if (joinedEvent.confirmedParticipants.concat(joinedEvent.potentialParticipants)
                .some(item => {return item.user === $scope.user.data.user.user})) {
                console.log($scope.user.data.user.user, ' cannot join an event they have already joined');
            } 
            else {
                $http.put('/events', {eventData: joinedEvent._id}, {contentType: 'application/json'})
                .then(function (response) {
                    console.log('Update Successful: ', response);  
                })
                .catch(function (err) {
                    console.error('Update Failed: ', err);
                });
                $state.go("app.event", {eventId: joinedEvent._id});
            }
        };

       $scope.openEventDetails = function(clickedEvent) {
         $state.go("app.event", {eventId: clickedEvent._id, event: clickedEvent});
        }
    },
    templateUrl: '../templates/card.html'
  };
}]);