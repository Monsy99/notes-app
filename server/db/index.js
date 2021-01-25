const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:123@cluster0.bip17.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.error("Database connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
