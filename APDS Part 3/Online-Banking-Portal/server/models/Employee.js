const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
