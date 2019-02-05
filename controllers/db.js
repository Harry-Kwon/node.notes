var mongoose = require('mongoose');
var Note = require('../models/note.js');

var db = {};

db.connect = function(connectionUrl){
  mongoose.connect('mongodb://test:password1@ds053370.mlab.com:53370/notes-app', {useNewUrlParser: true});
}

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



module.exports = db;
/*
module.exports.createModel = function(name, schema) {
  return mongoose.model(name, schema);
};

module.exports.createRecord = function(model, data, callback){
  var newRecord = model(data).save(function(err, data){
    if(err) throw err;
    callback(err, data);
  });
};

module.exports.findRecord = function(model, search, callback) {
  model.find(search, function(err, data){
    if (err) throw err;
    callback(err, data);
  });
};

module.exports.updateRecord = function(model, search, updateData, callback){
  model.find(search, function(err, searchResult){
    searchResult.forEach(function(record){
      record.set(updateData);
      record.save(function(err, updatedRecord) {
        if (err) throw err;
        callback(err, updatedRecord);
      });
    });
  });
};

module.exports.deleteRecord= function(model, search, callback){
  model.find(search).remove(function(err, data){
    if(err) throw err;
    callback(err, data);
  });
};

module.exports.disconnect = function() {
  //disconnect from database
	mongoose.disconnect();
};

*/