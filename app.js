angular.module('noteApp', [])

.directive('notepad', function(notesFactory) {
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs) {
      scope.restore = function() {

      };

      scope.openEditor = function() {

      };

      scope.saveNote = function() {

      };
    },
    templateUrl: 'template.html'
  }
})

.factory('notesFactory', function() {
  return {
    put: function(note) {
      localStorage.setItem('note' + note.id, note);
    };

    get: function(index) {
      return localStorage.getItem('note' + index);
    };

    getAll: function() {
      var notes = [];
      for (var i = 0; i < localStorage.length; i++) {
        var note = localStorage.getItem('note' + i);
        notes.push(note);
      };
      return notes;
    };
  }
})