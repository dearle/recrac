// An Angular service that talks to Express
angular.module('App')
  .service('ParseService', function ($http) {
    var CurrentUser = null;
    return {
      login: function login() {
        return $http.get("/auth/facebook")
          .then(function(response) {
            console.log('login', response);

            CurrentUser = response.data;
            return response.data;
          })
      },
      getCurrentUser: function() {
        if (CurrentUser) {
          return $q.when(CurrentUser);
        } else {
          return $q.reject("No User");
        }
      },
      logout: function logout(){
        return $http.get("/logout")
          .then(function(response) {
            console.log('logout success', reponse)
            //res.redirect('/login');
          })
      }
    }
  })
  


// factory('auth', ['$http', '$state', function(user) {
  
//         .success(function (data, status) {
//           console.log('Successful login.');
//           console.log('data = ' + data); 
//           console.log('status = ' + status); 
//           $state.go('welcome'); // 
//       })
//         .error(function (data) {
//           console.log('Error: ' + data);
//           $state.go('login'); 
//       });
// }]);

