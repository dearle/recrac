angular.module('App')
.controller('CreateModal', function($scope, $mdDialog, $interval) {

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
    // alert("test");
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.saveEvent = function() {
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
      })
    };
  }
})