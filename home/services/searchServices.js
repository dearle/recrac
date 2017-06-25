angular.module('App')
.factory('searchServices', function() {
  
  var filters = ["Job", "Class", "Food", "Party"]
  var filterObj = {"Job":true,"Class":true,"Food":true,"Party":true};
   //all selected filters updated by clicking fliters
  filterByType = function(event) {
    return filterObj[event.type] || nofilter(filterObj)
  }

  nofilter = function(filterObj) {
    return Object.
      keys(filterObj).
      every(function (key) { return !filterObj[key]; });
  }

  return {filters:filters,
          filterObj:filterObj,
          filterByType: filterByType,
          nofilter: nofilter}

})