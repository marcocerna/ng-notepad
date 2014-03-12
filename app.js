angular.module('noteApp', [])

.directive('notepad', function(notesFactory) {
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs) {
      scope.restore = function() {};

      scope.openEditor = function() {};

      scope.saveNote = function() {};
    },
    templateUrl: 'template.html'
  }
})

.factory('notesFactory', function() {
  return {
    put: function(note) {};

    get: function(index) {};

    getAll: function() {};
  }
})