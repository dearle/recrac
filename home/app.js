angular.module('App', ['Appblah.Services', 'ui.router'])
.config(function CheckForAuthenticatedUser(ParseService, $state) {
    return ParseService.getCurrentUser().then(function(_user) {
      return _user;
    }, function(_error) {
      $state.go('login');
    })
  })
 .config(function($stateProvider, $urlRouterProvider) { 
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
    templateUrl: './templates/app.home.html',
    abstract: true,
    resolve: {
      resolvedUser: checkForAuthenticatedUser
    }
  })
  .state('app.home', {
    url: "/home",
    templateUrl: './templates/app.home.html',
    resolve: {
      CurrentUser: function(resolvedUser){
        return resolvedUser;
      }
    }
  })
  .state('app.dash', {
    url: "/dashboard",
    templateUrl: './templates/app.dash.html'
  })
})


//function that runs everytime the route changes. 

//lifecycle hooks that you can attach the callback to. onRouteChangeStart callback. 
