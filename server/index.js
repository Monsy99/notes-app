const express = require("express");
const db = require("./db");
const router = require("./routes/api-router");

const app = express();
const apiPort = 3000;
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use("/api", router);

//export for testing
module.exports = app.listen(apiPort, () =>
  console.log(`Server running on port ${apiPort}`)
);
