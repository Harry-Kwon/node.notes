var bodyParser = require('body-parser');
var db = require('./db.js');

var urlencodedParser = bodyParser.urlencoded({extended: true});

//params: app - express app
module.exports = function (app) {
  
  //render view from data from database
  app.get('/notes', function(req, res){
    db.findNotes({}, function(searchResults){
      console.log(searchResults);
      res.render('notes', {notes: searchResults});
    });
  });
  
  //create new note
  app.post('/notes', urlencodedParser, function(req, res){
    console.log(req.body);
    let noteData = {title: req.body.title};
    db.createNote(noteData);
    res.end('');
  });
  
  // update note
  app.put('/notes/:noteId', urlencodedParser, function(req, res){
    console.log(req.params.noteId);
    console.log(req.body.title);
    db.updateNoteTitle(req.params.noteId, req.body.title, function(raw){
      res.json(raw);
    });
  });
  
  // remove note
  app.delete('/notes/:noteId', urlencodedParser, function(req, res){
    let query = {_id: req.params.noteId};
    db.removeNote(query);
    res.end('');
  });
}


