const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 50 },
  
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
