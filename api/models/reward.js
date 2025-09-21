const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  cost: {
    required: true,
    type: Number,
  },
  isArchived: {
    required: true,
    type: Boolean,
  },
});

module.exports = mongoose.model("Reward", rewardSchema);
