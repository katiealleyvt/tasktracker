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
  createdOn: {
    type: Date,
  },
  updatedOn: {
    type: Date,
  },
  archivedOn: {
    type: Date,
  },
});

module.exports = mongoose.model("Task", taskSchema);
