const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);
