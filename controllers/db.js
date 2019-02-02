var mongoose = require('mongoose');

module.exports.connect = function() {
  //Connect to database
  mongoose.connect('mongodb://test:password1@ds053370.mlab.com:53370/notes-app');
};

module.exports.createSchema = function(schema) {
  return new mongoose.Schema(schema);
};

module.exports.createModel = function(name, schema) {
  return mongoose.model(name, schema);
};

module.exports.findRecord = function(model, search, callback) {
  Todo.find(search, callback);
};

module.exports.createRecord = function(){};
module.exports.readRecord = function(){};
module.exports.updateRecord = function(){};
module.exports.deleteRecord = function(){};

module.exports.disconnect = function() {
  //disconnect from database
	mongoose.disconnect();
};