const mongoose = require("mongoose");
const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/notes";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database ", url);
  })
  .catch((e) => {
    console.error("Database connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
