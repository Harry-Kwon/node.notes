//note model
const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
  title: String,
});

const modelName = 'Note';

var NoteModel = mongoose.model(modelName, noteSchema);

module.exports = NoteModel;