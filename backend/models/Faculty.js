const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  faculty_id: {
    type: Number,
    required: true,
    unique: true
  },
  faculty_name: {
    type: String,
    required: true
  },
  faculty_dept: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports =  mongoose.model('Faculty', FacultySchema);


