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
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: function () {
        return this.role === "user" || this.role === "admin"
          ? "approved"
          : "pending";
      },
    },
    isBanned: {
      type: String,
      enum:["banned","NotBanned"],
      default: "NotBanned"
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
