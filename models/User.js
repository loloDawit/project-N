/**
 **  User Schema
 *
 */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  profilePic: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
