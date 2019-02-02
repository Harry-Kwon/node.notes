const uuidv4 = require('uuid/v4');

var Note = function(data){
  this.data = data;
  if(!this.data.name){
  	this.data.name = 'untitled';
  }
  this.data.id = this.generateNodeId();
};

Note.prototype.generateNodeId = function(data){
  return uuidv4();
};

Note.prototype.schema = {
  name: String,
 	id: String;
};

module.exports = Note;