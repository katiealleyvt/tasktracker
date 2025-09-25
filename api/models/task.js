const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  points: {
    required: true,
    type: Number,
    default: 0,
  },
  status: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Task", taskSchema);
