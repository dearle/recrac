angular.module('App', ['ui.router'])
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
  .state({
    name: 'home',
    url: '/',
    template: '<app-directive/>'
  })
  .state({

  })
})

//function that runs everytime the route changes. 

//lifecycle hooks that you can attach the callback to. onRouteChangeStart callback. 
