angular.module('App', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
    .state({
      name: 'message',
      url: '/message',
      template: '<message-directive></message-directive>'
    })
    .state({
      name: 'history',
      url: '/history',
      template: '<history-directive messages="$resolve.messages"></history-directive>',
      resolve: {
       messages: function (FetchService) {
        return FetchService.getMessages();
      }
    }
  })
})
