const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  }, 
  endDate: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

module.exports = new mongoose.model("trip", tripSchema);
