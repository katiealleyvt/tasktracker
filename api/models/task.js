const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  points: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Task", taskSchema);
