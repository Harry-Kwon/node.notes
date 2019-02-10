var bodyParser = require('body-parser');
var db = require('./db.js');

var urlencodedParser = bodyParser.urlencoded({extended: true});

//params: app - express app
module.exports = function (app) {
  
  //render view from data from database
  app.get('/notes', function(req, res){
    db.findUser({sessionId: req.sessionID}, function(data){
      if(data.length != 1) {
        res.status(404).send('could not find user');
      }
      let user=data[0];
      db.findNotes({owner: user.username}, function(searchResults){
        console.log(searchResults);
        res.render('notes', {notes: searchResults});
      });
    });
  });
  
  //create new note
  app.post('/notes', urlencodedParser, function(req, res){
    console.log(req.body);
    db.findUser({sessionId: req.sessionID}, function(data){
      if(data.length != 1) {
        res.status(404).send('could not find user');
      }
      let user = data[0];
      let noteData = {title: req.body.title, owner: user.username};
      db.createNote(noteData);
      res.end('');
    });

  });
  
  // update note
  app.put('/notes/:noteId', urlencodedParser, function(req, res){
    db.findUser({sessionId: req.sessionID}, function(data){
      if(data.length != 1) {
        res.status(404).send('could not find user');
      }
      let user = data[0];
      console.log(user);
      db.findNotes({_id: req.params.noteId}, function(notes){
        if(notes.length != 1) {
          res.status(404).send('could not find note');
          return false;
        }
        let note = notes[0];
        console.log(note);
        if(user.username === note.owner){
          db.updateNoteTitle(req.params.noteId, req.body.title, function(raw){
            res.json(raw);
          });
        } else {
          res.status(401).send('you do not own this note');
        }
      });
    });
  });
  
  // remove note
  app.delete('/notes/:noteId', urlencodedParser, function(req, res){
    let query = {_id: req.params.noteId};
    db.findUser({sessionId: req.sessionID}, function(data){
      if(data.length != 1) {
        res.status(404).send('could not find user');
      }
      let user = data[0];
      db.findNotes({_id: req.params.noteId}, function(notes){
        if(notes.length != 1) {
          res.status(404).send('could not find note');
          return false;
        }
        let note = notes[0];
        if(user.username === note.owner){
          db.removeNote(query);
          res.send('deleted note');
        } else {
          res.status(401).send('you do not own this note');
        }
      });
    });
  });
}


