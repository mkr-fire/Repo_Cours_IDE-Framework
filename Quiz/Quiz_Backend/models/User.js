const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\S+$/
  },

  bestScore: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model(
  "User",
  userSchema
);