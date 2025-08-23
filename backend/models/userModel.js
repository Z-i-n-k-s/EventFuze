const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePic: String,
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "CLUB_ADMIN", "STUDENT"],
      default: "STUDENT",
    },
    clubs: [String], // IDs of clubs the student has joined
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
