angular.module('App')
// .controller("EditCtrl", 
  .directive('clickToEdit', function () {
    var editorTemplate = '' +
        '<div class="click-to-edit">' +
            '<div ng-hide="view.editorEnabled">' +
                '{{value}} ' +
                '<a class="button tiny" ng-click="enableEditor()">Edit</a>' +
            '</div>' +
            '<div ng-show="view.editorEnabled">' +
                '<input type="text" class="small-12.columns" ng-model="view.editableValue">' +
                '<a class="button tiny"  ng-click="save()">Save</a>' +
                ' or ' +
                '<a class="button tiny" ng-click="disableEditor()">cancel</a>' +
            '</div>' +
        '</div>';

    return {
      restrict: 'A',
      replace: true,
      template: editorTemplate,
      scope: {
        value: '=clickToEdit',
      },

      link: function (scope, element, attrs) {
        scope.view = {
          editableValue: scope.value,
          editorEnabled: false
        };

        scope.enableEditor = function () {
          scope.view.editorEnabled = true;
          scope.view.editableValue = scope.value;
          setTimeout(function () {
            element.find('input')[0].focus();
            //element.find('input').focus().select(); // w/ jQuery
          });
        };

        scope.disableEditor = function () {
          scope.view.editorEnabled = false;
        };

        scope.save = function () {
          scope.value = scope.view.editableValue;
          scope.disableEditor();
        };
        // scope.save = function() {
        // mappingTools.saveEvent($scope.event, $scope.id).then(function() {
        //   alert("TEST SAVE");
        // }
      }
    };
  });