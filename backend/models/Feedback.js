const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
    },
    service: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 500, // Limit comment length
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
