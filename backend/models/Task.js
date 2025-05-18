const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  assignedTo: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Done'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);