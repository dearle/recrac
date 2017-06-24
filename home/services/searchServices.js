angular.module('App')
.factory('searchServices', function() {
  
  function filterAll(filters) {
    console.log(filters);
  }

  return {filterAll:filterAll}

})