angular.module('noteapp', [])

.directive('notepad', function(notesFactory) {
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs) {
      scope.restore = function() {
        console.log('restore!')
        scope.noteText = '';
        scope.index = -1;
        scope.editMode = false;
      };

      scope.openEditor = function(index) {
        console.log('openEditor with index: ' + index)
        scope.editMode = true;

        if (index !== undefined) {
          console.log('index !== undefined')
          scope.noteText = notesFactory.get(index).content;
          scope.index = index;
        } else {
          console.log('index == undefined')
          scope.noteText = '';
        }
      };

      scope.saveNote = function() {
        console.log('saveNote!')
        console.log('noteText is: ' + scope.noteText)
        if (scope.noteText !== '') {
          var note = {};

          note.title = scope.noteText.length > 20 ? scope.noteText.substring(0, 20) : scope.noteText;
          note.content = scope.noteText;
          note.id = scope.index;

          console.log('note is: ' + note)
          scope.notes = notesFactory.put(note);
        }

        scope.restore();
      };

      scope.restore();
    },
    templateUrl: 'template.html'
  }
})

.factory('notesFactory', function() {
  return {
    put: function(note) {
      console.log("notesFactory 'put' with note: " + note);
      localStorage.setItem('note' + note.id, note);
      return this.getAll();
    },

    get: function(index) {
      console.log("notesFactory 'get' with index: " + index);
      return localStorage.getItem('note' + index);
    },

    getAll: function() {
      console.log("notesFactory 'getAll' ")
      var notes = [];
      for (var i = 0; i < localStorage.length; i++) {
        var note = localStorage.getItem('note' + i);
        notes.push(note);
      };
      return notes;
    }
  }
})