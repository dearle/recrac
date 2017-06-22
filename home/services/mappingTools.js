angular.module('App').factory('mappingTools', ['$q', '$window', '$http', function ($q, $window, $http) {
  function getCurrentPosition() {
    var deferred = $q.defer();

    if(!$window.navigator.geolocation) {
      deferred.reject('Geolocation services not available')
    } else {
      $window.navigator.geolocation.getCurrentPosition(
        function (position) {
          deferred.resolve(position);
        }, function(err) {
          deferred.reject(err);
        });
    }
        return deferred.promise;
    }

  function getEvents() {
    return $http.get('/events', {contentType: 'application/json'})
    .then(function (response) {
      console.log('Get Successful: ', response);  
      return response.data;
    })
    .catch(function (response) {
      console.error('Get Failed', response);
    });
  }

  function eventToGeoJson(data) {
    var geoJson = {
      "type": "FeatureCollection",
      "features": []
    }
    var geoJsonPoint =  {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": []
          },
          "properties": {}
        }

    data.forEach(function(point) {
      var newpoint = geoJsonPoint;
      newpoint.geometry.coordinates.push(point.location.lat, point.location.lng)
      for (let property in point) {
        if (property !== 'location') {
          newpoint.properties[property] = point[property]
        }
      }
      geoJson.features.push(newpoint)
    })
    
    return JSON.stringify(geoJson);

  }    

  defaultLoc = {
                  lat: 40.7475170623211,
                  lng: -73.95343780517578,
                  zoom: 12
                }

  defaultTile = {'//api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2RhbW9uIiwiYSI6InFVV1VLMFUifQ.2Zx0T9w01EK6E-v76-z85Q'}

    return {
      getCurrentPosition : getCurrentPosition,
      getEvents: getEvents,
      eventToGeoJson: eventToGeoJson,
      defaultLoc: defaultLoc,
      defaultTile: defaultTile,
    }
}]);