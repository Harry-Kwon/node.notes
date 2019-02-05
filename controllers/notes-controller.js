var bodyParser = require('body-parser');
var db = require('./db.js');
var Note = require('./note.js');

var urlencodedParser = bodyParser.urlencoded({extended: true});

//init database
db.connect();
var noteSchema = db.createSchema(Note.prototype.schema);
var NoteModel = db.createModel('Note', noteSchema);

//params: app - express app
module.exports = function (app) {
  
  //render view from data from database
  app.get('/notes', function(req, res){
    db.findRecord(NoteModel, {}, function(err, searchResults){
      console.log(searchResults);
      res.render('notes', {notes: searchResults});
    });
  });
  
  //create new note
  app.post('/notes', urlencodedParser, function(req, res){
    
		var newNote = new Note(req.body);
    db.createRecord(NoteModel, newNote.data, function(err, data) {
      res.json(data);
    });
  });
  
  app.put('/notes/:noteId', urlencodedParser, function(req, res){
    db.updateRecord(NoteModel, 
                    {id: req.params.noteId},
                    {title: req.body.title},
                    function(err, data){
      res.json(data);
    });
  });
  
  app.delete('/notes/:noteId', urlencodedParser, function(req, res){
    db.deleteRecord(NoteModel, {id: req.params.noteId}, function(err, data){
      res.json(data);
    });
  });
}


