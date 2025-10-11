const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: process.cwd() + "/.env" });
const taskRoutes = require("./routes/task-routes");
const rewardRoutes = require("./routes/reward-routes");
const walletRoutes = require("./routes/wallet-routes");
const app = express();


app.use(express.json());
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://tasktracker-4qqn.onrender.com',
  issuerBaseURL: 'https://dev-lsuvai0lfhu3sxhm.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});


app.listen(port, () => {
  console.log(`Server Started at ${port}`);
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
app.router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token' });
  } else {
    next(err);
  }
});
