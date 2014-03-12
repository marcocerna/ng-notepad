angular.module('noteApp', [])

.directive('notepad', function(notesFactory) {
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs) {

    },
    templateUrl: 'template.html'
  }
})

.factory('notesFactory', function() {

})