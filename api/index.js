const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const taskRoutes = require("./routes/task-routes");
const rewardRoutes = require("./routes/reward-routes");
const walletRoutes = require("./routes/wallet-routes");

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
const mongoString = process.env.DB_CONN_STR;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/wallet", walletRoutes);
