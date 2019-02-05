// there are model definitions in mongoose, 
// but the idea hereis to decouple abstract data models from the database implementation
// which means if I decide to move away from mongoose or move to a MySQL database, only the db.js database wrapper needs to be modified
// instead of modifying the definition of every model in the project
// I think this is good decoupling? but there is a slight feeling that this is unecessary wrapping wrappers with wrappers and adding layers that do nothing
const uuidv4 = require('uuid/v4');
const fs = require('fs');

var Note = function(data){
  this.data = data;
  if(!this.data.title){
  	this.data.title = 'untitled';
  }
  this.data.id = this.generateId();
};

// generates a unique id
Note.prototype.generateId = function(data){
  return uuidv4();
};

// Create database schema
Note.prototype.schema = {
  title: String,
 	id: String
};

module.exports = Note;