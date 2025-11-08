const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  dob: Date,
  address: String,
  phone: String,
  state: String,
  zipCode: String,
  email: String,
  gender: String,
  userType: String,
});

module.exports = mongoose.model('User', userSchema);
