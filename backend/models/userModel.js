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
    clubs: [
      {
        clubId: { type: String, required: true },
        clubName: { type: String, required: true },
        role: {
          type: String,
          enum: ["Member", "Moderator", "VicePresident", "President"],
          default: "Member",
        },
        joinedAt: { type: Date, default: Date.now },
      },
    ], // Array of clubs with role and joined date
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
