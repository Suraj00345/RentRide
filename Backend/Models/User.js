const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
    },
    phone_no: {
      type: String,
    },
    license: {
      type: String,
    },
    ID: {
      type: String,
    },
    city: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: function () {
        return this.role === "user" || this.role === "admin";
      },
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
