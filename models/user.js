//user model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
	passwordHash: String,
  passwordSalt: String,
  sessionId: String,
});

const modelName = 'User';

var UserModel = mongoose.model(modelName, userSchema);

module.exports = UserModel;