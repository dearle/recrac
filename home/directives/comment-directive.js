angular.module('App')
.directive('commentDirective', function() {
  return {
    restrict: 'E',
  template: 
   `<div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">
      <div class="section__circle-container__circle mdl-color--primary" style="background:url('{{ user.data.user.picture }}'); background-size:cover;"></div>
    </div>
    <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone event-details">
      <p>{{user.data.user.user}}</p>

      <p>Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Duis nulla tempor do aute et eiusmod velit exercitation nostrud quis</p>

      <div class="rating">
        <p>&#x2605 &#x2605 &#x2605 &#x2605</p><br/>
      </div>
    </div>`
  };
});