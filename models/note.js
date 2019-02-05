//note model
const fs = require('fs');
const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
  title: String,
  id: String
});

const modelName = 'Note';

var NoteModel = mongoose.model(modelName, noteSchema);

module.exports = NoteModel;