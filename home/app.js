angular.module('App', ['ui.router'])
 .controller('MainController', function ($scope, ParseService) {
        ParseService.login().then(function loginSuccess(_loggedInUser) {
            // called when successful...
            // logged in and we have a user object
            alert("User Logged In " + _loggedInUser.username);

        }, function error(_error) {
            // if error occurred anywhere above, this code will
            // be executed
            alert("ERROR " + _error);
        })
     })   
.config(function CheckForAuthenticatedUser(ParseService, $state) {
    return ParseService.getCurrentUser().then(function(_user) {
      return _user;
    }, function(_error) {
      $state.go('login');
    })
  })
 .config(function($stateProvider) { 
  $stateProvider
    .state({
      name: 'history',
      url: '/history',
      template: '<history-directive></history-directive>',
      // messages="$resolve.messages"
      //resolve: {
      //  // messages: function (FetchService) {
      //  //  return FetchService.getMessages();
      // }
    //}
  })
  .state({
    name: 'login',
    url: '/login',
    template:'<login-directive/>'

  })
  .state('app', {
    url: '/app',
    template: '<app-directive/>',
    abstract: true,
    resolve: {
      resolvedUser: checkForAuthenticatedUser
    }
  })
  .state('app.home', {
    url: "/home",
    template: '<app-directive/>',
    resolve: {
      CurrentUser: function(resolvedUser){
        return resolvedUser;
      }
    }
  })
})

//function that runs everytime the route changes. 

//lifecycle hooks that you can attach the callback to. onRouteChangeStart callback. 
