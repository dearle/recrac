angular.module('App').
controller('HomeController', ['$scope',  '$rootScope', 'userService', 'mappingTools',
function ($scope, $rootScope, userService, mappingTools) {
  $scope.tiles = {name: 'Mapbox Streets',  
                  url: '//api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2RhbW9uIiwiYSI6InFVV1VLMFUifQ.2Zx0T9w01EK6E-v76-z85Q'
          }
  angular.extend($scope, {
    currentLoc: {
            lat:40.76624155398039,
            lon: -73.94433975219727,
            zoom:12
          },
          tiles: {name: 'Mapbox Streets',  
                  url: '//api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2RhbW9uIiwiYSI6InFVV1VLMFUifQ.2Zx0T9w01EK6E-v76-z85Q'
          }
  });
    userService //authentication
      .authenticate()
      .then(function (user) { $scope.user = user });

    mappingTools //get current loc from browser
      .getCurrentPosition().then((position) => {
        console.log(position.coords);
        $scope.currentLoc = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  zoom: 12
              }
          });
}]);
            