angular.module('noteApp', [])

.directive('notepad', function(notesFactory) {
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs) {
      scope.restore = function() {
        scope.noteText = '';
        scope.index = -1;
        scope.editMode = false;
      };

      scope.openEditor = function(index) {
        scope.editMode = true;

        if (index !== -1) {
          scope.noteText = notesFactory.get(index).content;
          scope.index = index;
        } else {
          scope.noteText = '';
        }
      };

      scope.saveNote = function() {
        if (scope.noteText !== '') {
          var note = {};

          note.title = scope.noteText.length > 20 ? scope.noteText.substring(0, 20) : scope.noteText;
          note.content = scope.noteText;
          note.id = scope.index;

          notesFactory.put(note)
        }

        scope.restore();
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