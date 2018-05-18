const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  friend: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('findOneAndUpdate', function runValidators(next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('User', UserSchema);
