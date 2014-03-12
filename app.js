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

        debugger
      };

      scope.saveNote = function() {
        console.log('saveNote!')
        scope.noteText = document.getElementById('editor').innerHTML;

        console.log('noteText is: ' + scope.noteText)
        if (scope.noteText !== '') {
          var note = {};

          note.title = scope.noteText.length > 20 ? scope.noteText.substring(0, 20) : scope.noteText;
          note.content = scope.noteText;
          note.id = scope.index !== -1 ? scope.index : localStorage.length;

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
      localStorage.setItem('note' + note.id, JSON.stringify(note));
      return this.getAll();
    },

    get: function(index) {
      console.log("notesFactory 'get' with index: " + index);
      return JSON.parse(localStorage.getItem('note' + index));
    },

    getAll: function() {
      console.log("notesFactory 'getAll' ")
      var notes = [];
      for (var i = 0; i < localStorage.length; i++) {
        var note = localStorage.getItem('note' + i);
        notes.push(JSON.parse(note));
      };
      console.log(notes);
      return notes;
    }
  }
})