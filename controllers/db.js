var mongoose = require('mongoose');

module.exports.connect = function() {
  //Connect to database
  mongoose.connect('mongodb://test:password1@ds053370.mlab.com:53370/notes-app', {useNewUrlParser: true});
};

module.exports.createSchema = function(schema) {
  return new mongoose.Schema(schema);
};

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
    console.log('searchResult');
    console.log(searchResult);
    searchResult.forEach(function(record){
      console.log('record');
      console.log(record);
      console.log('1');
      console.log(updateData);
      record.set(updateData);
      console.log('2');
      console.log(record);
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