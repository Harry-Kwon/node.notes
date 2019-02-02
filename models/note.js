const uuidv4 = require('uuid/v4');

var Note = function(data){
  this.data = data;
  this.data.id = this.generateNodeId();
  if(!this.data.name){
  	this.data.name = 'default-name';
  }
};

Note.prototype.generateNodeId = function(data){
  return uuidv4();
};

module.exports = Note;