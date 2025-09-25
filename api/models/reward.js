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
});

module.exports = mongoose.model("Reward", rewardSchema);
