var mongoose = require('mongoose');
var Note = require('../models/note.js');
var User = require('../models/user.js');

var db = {};
db.connect = function(connectionUrl){
  mongoose.connect('mongodb://test:password1@ds053370.mlab.com:53370/notes-app', {useNewUrlParser: true});
}
db.connect('');

// noteData - object containing data about model instance/document
db.createNote = function(noteData) {
  let createdNote = new Note(noteData);
  createdNote.save(function (err){
    if(err) throw err;
  });
};

// query - query document of notes to find
// returns array of docs satisfying query to callback
db.findNotes = function(query, callback) {
  Note.find(query, function(err, data){
    if (err) throw err;
    callback(data);
  });
};

// id - id of note to be changed
// title - new title of note
// returns - raw response from mongo
db.updateNoteTitle = function(noteId, noteTitle, callback) {
  Note.updateOne({_id: noteId}, {title: noteTitle}, function(err, raw){
    if(err) throw err;
    callback(raw);
  });
}

// query - query document of notes to be deleted (ex. {id: '<ID_VALUE>'} or {title: '^textbf_'})
db.removeNote = function(query) {
  Note.deleteMany(query, function(err){
    if(err) throw err;
  });
  
}

// query - query document of user to search for
// callback(docs) - passes array of user documents satisfying query
db.findUser = function(query, callback) {
  User.find(query, function(err, data){
    if(err) throw err;
    callback(data);
  });
}

db.createUser = function(userData, callback) {
  let createdUser = new User(userData);
  createdUser.save(function (err, product){
    if(err) throw err;
    callback(product);
  });
};

module.exports = db;
