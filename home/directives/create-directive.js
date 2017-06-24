// angular.module('App')

// .directive('createDirective', ['$http', function($http) {
//   return {
//     scope: {},
//     restrict: 'E',
//     controller: function ($scope) {
//       $scope.event = {
//         name: "",
//         description: "",
//         host: "",
//         type: "",
//         location: "",
//         desiredParticipants: 0,
//         time: "",
//         price: 0,
//         confirmedParticipants: "",
//         potentialParticipants: ""
//       }

//       var req = {
//        method: 'POST',
//        url: "/events",
//        headers: {
//          'Content-Type': "application/json"
//        },
//        data: $scope.event
//       }
      
//       alert("test");
//       $scope.saveEvent = function() {
//         console.log($scope.event);
//         $http(req).then(function(success, error) {
//           if (error) {
//             console.log(error);
//             return;
//           }
//           console.log(success);
//         })
//       }
//     },
//     templateUrl: '../templates/create.html'
//   };
// }]);

