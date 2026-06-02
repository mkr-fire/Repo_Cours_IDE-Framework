const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100
    },

    description: {
      type: String
    },

    status: {
      type: String,
      enum: ["A faire", "En cours", "Termine"],
      default: "A faire"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", taskSchema);