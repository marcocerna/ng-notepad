angular.module('noteapp', [])

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
        if (index !== undefined) {
          scope.noteText = notesFactory.get(index).content;
          scope.index = index;
        } else {
          scope.noteText = '';
        }
      };

      scope.saveNote = function() {
        scope.noteText = document.getElementById('editor').innerHTML;
        if (scope.noteText !== '') {
          var note = {};
          note.title = scope.noteText.length > 20 ? scope.noteText.substring(0, 20) : scope.noteText;
          note.content = scope.noteText;
          note.id = scope.index !== -1 ? scope.index : localStorage.length;
          scope.notes = notesFactory.put(note);
        }
        scope.restore();
      };

      scope.deleteNote = function() {
        console.log("Index is: " + scope.index);
        if (scope.index !== -1) {
          scope.notes = notesFactory.delete(scope.index);
        }
        scope.restore();
      };

      scope.restore();
      scope.notes = notesFactory.getAll();

    },
    templateUrl: 'template.html'
  }
})

.factory('notesFactory', function() {
  return {
    put: function(note) {
      localStorage.setItem('note' + note.id, JSON.stringify(note));
      return this.getAll();
    },

    get: function(index) {
      return JSON.parse(localStorage.getItem('note' + index));
    },

    getAll: function() {
      var notes = [];
      for (var key in localStorage) {
        notes.push(JSON.parse(localStorage.getItem(key)));
      };
      return notes;
    },
    delete: function(index) {
      localStorage.removeItem('note' + index);
      return this.getAll();
    }
  }
})