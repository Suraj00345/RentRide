const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    carName: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// IMPORTANT INDEX FOR SEARCH
carSchema.index({ city: 1, pricePerDay: 1 });

module.exports = mongoose.model("Car", carSchema);
