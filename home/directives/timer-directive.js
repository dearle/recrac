angular.module( "App")
  .directive('timerDirective', function() {

   return {
    scope: {
    id: '<'
  },
    restrict: 'E',
    controller: function ($scope,$http) { 

      var dateFromObjectId = function (objectId) { //https://steveridout.github.io/mongo-object-time/
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
      };

      var deadline = dateFromObjectId($scope.id);
      console.log("Deadline for scope " + $scope.id + " is " + deadline);
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

      }, //the end of controller 
      
    templateUrl: '../templates/timer.html'
   }  
  }); 