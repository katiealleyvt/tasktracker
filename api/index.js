const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: process.cwd() + "/.env" });
const taskRoutes = require("./routes/task-routes");
const rewardRoutes = require("./routes/reward-routes");
const walletRoutes = require("./routes/wallet-routes");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
const mongoString = process.env.DB_CONN_STR;
if (mongoString === undefined) {
  throw new Error("DB_CONN_STR is not defined in environment variables");
}
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
