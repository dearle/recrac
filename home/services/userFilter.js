angular.module('App') //a filter to sort for events the user has joined.
.filter('participantMatch', function() {
  return function(events, username) {
    var filtered = [];
    angular.forEach(events, function(event) {
      event.confirmedParticipants.forEach(function(participant){
        if(participant.user  === username) {
          filtered.push(event);
        }
      })  
    });
    console.log(filtered);
    return filtered;
  };
});