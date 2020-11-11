const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

module.exports = new mongoose.model("experience", experienceSchema);