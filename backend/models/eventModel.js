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
    registeredStudents: [String], // Array of student IDs
    clubsId: [String], // Multiple clubs hosting the event
    images: [String], // Multiple images
    createdBy: String, // SuperAdmin or ClubAdmin user ID
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    // Registration fee details
    isFree: { type: Boolean, default: true },
    registrationFee: {
      type: Number,
      default: 0,
      min: [0, "Registration fee cannot be negative"],
    },
    currency: { type: String, default: "USD" },
    // Registration period
    registrationStart: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
  },
  { timestamps: true }
);

// Automatically update `isFree` based on fee value
eventSchema.pre("save", function (next) {
  this.isFree = this.registrationFee === 0;

  // Optional: ensure registration deadline is after start
  if (this.registrationDeadline < this.registrationStart) {
    return next(
      new Error(
        "Registration deadline cannot be before registration start date"
      )
    );
  }

  next();
});

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
