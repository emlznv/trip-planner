const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  packed: {
    type: Boolean,
    required: true
  },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

module.exports = new mongoose.model("item", itemSchema);