const { Schema, model } = require('mongoose');

const ToDoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = model('ToDo', ToDoSchema);