// An Angular service that talks to Express
angular.module('App', ['ui.router']).
factory('auth', ['$http', '$state', function(user) {
  $http.post("/auth/facebook", user)
        .success(function (data, status) {
          console.log('Successful login.');
          console.log('data = ' + data); 
          console.log('status = ' + status); 
          $state.go('welcome'); // 
      })
        .error(function (data) {
          console.log('Error: ' + data);
          $state.go('login'); 
      });
}]);
