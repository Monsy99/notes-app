const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Note = new Schema(
  {
    current: {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
    version: { type: Number, required: false },
    deleted: { type: Boolean, required: false },
    history: { type: [], required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("note", Note);
