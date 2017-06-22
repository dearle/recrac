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

  function eventToMarker(data) {
    var Message = function Message(name, address, description) {
      this.name = name;
      this.address = address;
      this.description = description;
      this.message = `<b>${name}</b><br>${address}<br>${description}`
    }
    var Marker = function Marker(lat, lng, message, icon) {
      this.lat = lat;
      this.lng = lng;
      this.message = message;
      this.icon = icon || {};
    }
    
    var Markers = {};

    data.forEach(function(point) {
      var message = new Message(point.name, point.location.address, point.description);
      var marker = new Marker(point.location.lat, point.location.lng, message.message);
    
      Markers[point.name] = marker
    })
    
    return Markers

  }    

  defaultLoc = {
                  lat: 40.7475170623211,
                  lng: -73.95343780517578,
                  zoom: 12
                }

  defaultTile = {
    name:"mapbox street",
    url: '//api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2RhbW9uIiwiYSI6InFVV1VLMFUifQ.2Zx0T9w01EK6E-v76-z85Q'
  }

  defaultStyle = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }

    return {
      getCurrentPosition : getCurrentPosition,
      getEvents: getEvents,
      eventToMarker: eventToMarker,
      defaultLoc: defaultLoc,
      defaultTile: defaultTile,
      defaultStyle: defaultStyle
    }
}]);