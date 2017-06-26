angular.module('App')
  .controller('dashController', function ($scope, $http, userService, mappingTools) {
    $scope.events = [];
    mappingTools.getEvents().then(function(data) {
      $scope.events = data;
    });
    userService
      .authenticate()
      .then(function (user) { 
        $scope.user = user; 
      });
    $scope.updateUserInfo = function(id, email, number, description) {
      $http.put('/user/' + id, {email: email, number: number, description: description}, {contentType: 'application/json'})
        .then(function (response) {
          console.log('Put Successful: ', response);  
          return response.data;
        })
        .catch(function (response) {
          console.error('Put Failed', response);
        });
    };
  });