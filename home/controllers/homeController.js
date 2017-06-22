angular.module('App').
controller('HomeController', ['$scope', '$rootScope', 'userService', 'mappingTools', 'Data',
function ($scope, $rootScope, userService, mappingTools, Data) {
  var markers = {};
  userService //authentication
    .authenticate()
    .then(function (user) { $scope.user = user });

  $scope.tiles = mappingTools.defaultTile; //map set up
  $scope.defaults = { scrollWheelZoom: false
                      } //map set up
  $scope.currentLoc = mappingTools.defaultLoc; //map set up


  mappingTools //get current loc from browser
    .getCurrentPosition().then((position) => {
      $scope.currentLoc = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 12
            } 
      markers['curr'] = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        message: "You are here!",
        icon: L.icon.glyph({ prefix: 'mdi', glyph: 'my_location'}),
        focus: true
      }         
        });

  var markers = mappingTools.eventToMarker(Data);
 
  $scope.markers = markers;

}]);
            