angular.module('App').factory('mappingTools', ['$q', '$window', '$http', function ($q, $window, $http) {

//Get the current position from the browser and return that loc't as a proimse  

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

//Get all events from the db.
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


//take event data and convert it to mappable markers.

  function eventToMarker(data) {

//Message constructor for popups

    var Message = function Message(name, address, description) {
      this.name = name;
      this.address = address;
      this.description = description;
      this.message = `<b>${name}</b><br>${address}<br>${description}`
    }

//Marker Constructor: message is the popup, icon can be deault blue pin or something else...
//see: http://angular-ui.github.io/ui-leaflet/examples/0000-viewer.html#/markers/icons-example

    var Marker = function Marker(layer, lat, lng, message, icon) {
      this.layer = layer;
      this.lat = lat;
      this.lng = lng;
      this.message = message;
      this.icon = icon || {};
    }
    
    var Markers = {};

    data.forEach(function(point) { //for each event create new marker w/ message
      if (point.location) {
        var message = new Message(point.name, point.location.address, point.description);
        var marker = new Marker(point.type, point.location.lat, point.location.lng, message.message, icons[point.type]);
        Markers[point.name] = marker
      }
    })
    
    return Markers

  }

  function toggleLayer(type) {
    this.$parent.layers.overlays[type].visible = !this.$parent.layers.overlays[type].visible;
  }    

 var defaultLoc = { //default map location used to center map and to determien default zoom.
                  lat: 40.7475170623211,
                  lng: -73.95343780517578,
                  zoom: 12
                }

  var Layer =  {
    baselayers: {
      mapbox: {
        name: 'mapbox',
        type: 'xyz',
        url: '//api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2RhbW9uIiwiYSI6InFVV1VLMFUifQ.2Zx0T9w01EK6E-v76-z85Q'
      }
    },
    overlays: {
      Job: {
        type: 'group',
        name: 'Job',
        visible: true
      },
      Class: {
        type: 'group',
        name: "Class",
        visible: true
      },
       Food: {
        type: 'group',
        name: "Food",
        visible: true
      },
       Party: {
        type: 'group',
        name: "Party",
        visible: true
      }
    }
  }


 var defaultStyle = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }

  var icons = {
    Job: {
      type: 'extraMarker',
      icon: 'fa-usd',
      markerColor: 'orange-dark',
      prefix: 'fa',
      shape: 'circle'
    },
    Class: {
      type: 'extraMarker',
      icon: 'fa-book',
      markerColor: 'blue',
      prefix: 'fa',
      shape: 'penta'
    },
    Food: {
      type: 'extraMarker',
      icon: 'fa-cutlery',
      markerColor: 'green-light',
      prefix: 'fa',
      shape: 'square'
    }, 
    Party: {
      type: 'extraMarker',
      icon: 'fa-certificate',
      markerColor: 'violet',
      prefix: 'fa',
      shape: 'star'
    }
  }

    return {
      getCurrentPosition : getCurrentPosition,
      getEvents: getEvents,
      eventToMarker: eventToMarker,
      toggleLayer: toggleLayer,
      defaultLoc: defaultLoc,
      Layer: Layer,
      defaultStyle: defaultStyle
    }
}]);