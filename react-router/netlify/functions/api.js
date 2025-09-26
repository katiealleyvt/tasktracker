const mongoose = require("mongoose");
require("dotenv").config({ path: process.cwd() + "/.env" });

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoString = process.env.DB_CONN_STR;
  if (!mongoString) {
    throw new Error("DB_CONN_STR is not defined in environment variables");
  }

  await mongoose.connect(mongoString);
  cachedConnection = mongoose.connection;

  cachedConnection.on("error", (error) => {
    console.error("Database connection error:", error);
    throw error;
  });

  return cachedConnection;
}

module.exports = { connectToDatabase };
