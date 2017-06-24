angular.module( "App")
  .directive('timerDirective', function() {

   return {
    scope: {},
    restrict: 'E',
    controller: function ($scope,$http) {
    	// $scope.apple = 'apple'; 
    // var createdTime; 
    $http({
      method: 'GET',
      url: '/timer'
    })
    .then(function success(response) {
       
       var deadline = new Date ( response.data.created_at);
         deadline.setHours ( deadline.getHours() + 42 );
         $scope.startTimer =  startTimer("clock", deadline);

        function updateTimer(deadline) {
          var time = deadline - new Date(); 
          return {
            'hours': Math.floor( (time/(1000*60*60)) ),
            'minutes': Math.floor( (time/1000/60) % 60 ),
            'seconds': Math.floor( (time/1000) % 60 ),
            'total' : time
          };
        }; 

        function startTimer(id, deadline){
          var timerInterval = setInterval(function(){
            var clock = document.getElementById(id); //in html, if id=clock, apply this.
            var timer = updateTimer(deadline);

            clock.innerHTML = 
              '<span>' + timer.hours + ":" +   '</span>'
              + '<span>' +  timer.minutes + ":" + '</span>'
              + '<span>' +  timer.seconds + '</span>';
         
            if(timer.total < 1){
              clearInterval(timerInterval);
              clock.innerHTML = '<span>0</span><span>0</span><span>0</span>';
            }
          }, 1000);
        }; 

     }, function error(response) {
        console.log('NOPE')
      });
  
      }, //the end of controller 
      
    templateUrl: '../templates/timer.html'
   }  
  }); 