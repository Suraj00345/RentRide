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
    plate_no: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
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
    images: [
      {
        type: String,
      },
    ],
    trips: {
      type: String,
    },
    description: {
      ABS: {
        type: Boolean,
      },
      Cruise_Control: {
        type: Boolean,
      },
      Air_Bags: {
        type: String,
      },
      Air_conditioner: {
        type: Boolean,
      },
      Automatic_window: {
        type: Boolean,
      },
      fuel: {
        type: String,
      },
      seats: {
        type: String,
      },
      transmission: {
        type: String,
      },
      totalKM: {
        type: String,
      },
      rating: {
        type: String,
      },
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
