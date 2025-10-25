const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  cost: {
    type: Number,
    default: 0,
  },
  isArchived: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("Reward", rewardSchema);
