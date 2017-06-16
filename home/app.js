angular.module('App', ['ui.router'])
.config(function CheckForAuthenticatedUser($state) {
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
