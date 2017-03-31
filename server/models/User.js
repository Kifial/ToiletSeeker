const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  login: String,
  password: String,
  name: String,
  info: String,
  avatar: String,
  profileAvatar: String,
  deleted: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;