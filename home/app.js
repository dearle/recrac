angular.module('App', ['ui.router', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngAutocomplete', 'ui-leaflet' ])
.config(function($stateProvider, $urlRouterProvider) { 
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  //public state:
  .state({
    name: 'login',
    url: '/login',
    template:'<login-directive/>'
  })
    //prive states:
  .state('app', {
    url: '/app',
    templateUrl: './templates/app.home.html',
    abstract: true
  })
  .state('app.home', {
    url: "/home",
    templateUrl: './templates/app.home.html',
    controller: 'HomeController',
    resolve: {
      Data: function(mappingTools){
        return mappingTools.getEvents();
      }
    }  
  })
  .state('app.dash', {
    url: "/dashboard",
    templateUrl: './templates/app.dash.html',
    controller: function ($scope, userService) {
      userService
        .authenticate()
        .then(function (user) { $scope.user = user });
    }
  })
  // OLD EVENTS BACKED UP JUST IN CASE

  // .state('app.event', {
  //   url: "/events",
  //   templateUrl: './templates/app.event.html',
  //   controller: function ($scope, userService) {
  //     userService
  //       .authenticate()
  //       .then(function (user) { $scope.user = user });
  //   }
  // })

  .state('app.event', {
    url: "/events/:eventId",
    templateUrl: './templates/app.event.html',
    controller: function ($scope, $stateParams, userService) {

      $scope.id = $stateParams.eventId;
      // console.log('SCOPE ID: ', $scope.id)
      // userService
      //   .authenticate()
      //   .then(function (user) { $scope.user = user });
    }
  })


}) 
.run(function($transitions) { //this is like a lifecycle method for ui-router that checks at the start of a re-route (i.e state change) for any children of app 
  $transitions.onStart({ to: 'app.**' }, function(trans) { 
    var auth = trans.injector().get('userService');
    if (!auth.isAuthenticated()) { //is the user authenticated?
      // User isn't authenticated. Redirect to a new Target State
      return trans.router.stateService.target('login');
    }
  });
})
.factory('userService', function($q, $http, $timeout) {
  var user = undefined; //our user object. 

  return {
    authenticate: function() { //authenticate function makes initial async authentication
      var deferred = $q.defer(); //angular promise-ish thing: https://docs.angularjs.org/api/ng/service/$q tbh i dont get it. but it works.
      
      if (user) { //if we have a user ... sync return user
        return $q.when(user); //return the resolved user obj
      }
      //outerwise authenticate async
      $http.get('/account', { ignoreErrors: true }) // we make a request to /account. if authenticated /account returns user obj in req.body
           .then(function(data) {
              console.log("data from identity line 83 ", data);
               user = data; //on a success our user is equal to response obj.
                user.isAuthenticated = true; //add convenience isAuth property to obj.
               deferred.resolve(user); //resolve the promise with the user obj.
           }, function (response) {
            console.log("error in auth ", response)
               user = undefined;
               deferred.resolve(user);
      });

      return deferred.promise; //authenticate method returns a promise obj
    },

    isAuthenticated: function(){ //check if auth.
      return user !== undefined && user.isAuthenticated; 
      }
    }
    //logout: function(){
//         return $http.get("/logout")
//           .then(function(response) {
//             console.log('logout success', reponse)
//             //res.redirect('/login');
//           })
//       }
})
.run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) { 
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ])


