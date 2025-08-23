const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    images: [String], // club images
    milestones: [
      {
        title: String,
        description: String,
        date: Date,
        image: String,
      },
    ],
    adminId: { type: String }, 
    adminName: { type: String }, 
    members: [
      {
        userId: String, // student or club admin
        role: {
          type: String,
          enum: ["Member", "Moderator", "VicePresident", "President"],
          default: "Member",
        },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const clubModel = mongoose.model("club", clubSchema);
module.exports = clubModel;
