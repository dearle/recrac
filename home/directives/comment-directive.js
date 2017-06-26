angular.module('App')
.directive('commentDirective', function() {
  return {
    restrict: 'E',
    template: `
              <div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">
                <div class="section__circle-container__circle mdl-color--primary comment-photo" style="background:url('{{ event.host.picture }}'); background-size:cover;"></div>
              </div>
              <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone event-details comment-text">
                <p><strong>{{message.user}}</strong></p><p>{{message.text}}</p>
              </div>
              `
  };
});