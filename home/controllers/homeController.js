angular.module('App').
controller('HomeController', ['$scope', '$rootScope', 'userService', 'mappingTools', 'Data',
function ($scope, $rootScope, userService, mappingTools, Data) {
  
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
        });

  //$scope.geojson = mappingTools.eventToGeoJson(Data)
   
}]);
            