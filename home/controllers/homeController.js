angular.module('App')
.controller('HomeController', ['$scope', '$rootScope', '$state','userService', 'searchServices', 'mappingTools', 'Data',
function ($scope, $rootScope, $state, userService, searchServices, mappingTools, Data) {

  var markers = {};

  userService //authentication
    .authenticate()
    .then(function (user) { $scope.user = user });

  $scope.tiles = mappingTools.defaultTile; //map set up tiles from mapbox
  $scope.defaults = { scrollWheelZoom: false
                      } //map set up turn off scroll wheel zoom.
  $scope.currentLoc = mappingTools.defaultLoc; //map set up deault location.

  mappingTools //get current loc from browser
    .getCurrentPosition().then((position) => {
      $scope.currentLoc = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 12
      } 
      markers['curr'] = { //put a marker down at the curr loc't
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        message: "You are here!",
        icon: {  type: 'extraMarker',
                    icon: 'fa-star',
                    markerColor: '#f00',
                    prefix: 'fa',
                    shape: 'circle'},
        focus: true
      }         
        });

  var markers = mappingTools.eventToMarker(Data); //get markers from database
  
  $scope.markers = markers; //add them to the scope
  
  $scope.eventData = Data;

  $scope.filterObj = searchServices.filterObj;

  $scope.filterByType = searchServices.filterByType;

  $scope.nofilter = searchServices.nofilter;

  $scope.openEventDetails = function(eventId) {
    $state.go("app.event", {eventId: eventId});
  };
  $scope.joinEventHandler = function(eventName/*joiner, eventData*/) {
    //mappingTools.joinEvent(joiner, eventData);
    console.log("Event is: ", eventName);
  };
}])
