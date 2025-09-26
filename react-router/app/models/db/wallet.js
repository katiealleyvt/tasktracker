const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  amount: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Wallet", walletSchema);
