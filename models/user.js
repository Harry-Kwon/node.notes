//user model
const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
  name: String,
  email: String,
});