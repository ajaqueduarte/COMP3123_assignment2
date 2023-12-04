const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 50 },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'], maxlength: 25 },
  salary: { type: Number, required: true },
  
});

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
