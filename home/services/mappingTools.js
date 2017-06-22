angular.module('App').factory('mappingTools', ['$q', '$window', function ($q, $window) {
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

    return {
      getCurrentPosition : getCurrentPosition
    }
}]);