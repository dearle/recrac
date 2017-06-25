angular.module('App')
.controller('CreateModal', function($scope, $mdDialog, $interval, userService) {

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './templates/create.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
  };

  function DialogController($scope, $http, $mdDialog) {
    userService
        .authenticate()
        .then(function (user) { $scope.user = user });

    // alert("test");
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.saveEvent = function() {

      $scope.event.host = $scope.user.data.user.user;
      var req = {
        method: 'POST',
        url: "/events",
        headers: {
         'Content-Type': "application/json"
        },
        data: $scope.event
      }

      $http(req).then(function(success, error) {
        if (error) {
          console.log(error);
          return;
        }
        console.log(success);
        $mdDialog.cancel();
      })
    };
  }
})