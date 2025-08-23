const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    maxParticipants: { type: Number, default: 100 },
    registeredStudents: [String], // student IDs
    clubs: [String], // multiple clubs hosting this event
    images: [String], // multiple images
    createdBy: String, // SuperAdmin or ClubAdmin user ID
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    isPaid: { type: Boolean, default: false },
    registrationFee: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: "USD" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "not_required"],
      default: "not_required",
    },
  },
  { timestamps: true }
);

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
