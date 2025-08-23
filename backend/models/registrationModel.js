const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    eventId: { type: String, required: true },
    status: {
      type: String,
      enum: ["registered", "cancelled"],
      default: "registered",
    },
    registeredAt: { type: Date, default: Date.now },
    certificateUrl: String, // PDF certificate link
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "not_required"],
      default: "not_required",
    },
    amountPaid: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true }
);

const registrationModel = mongoose.model("registration", registrationSchema);
module.exports = registrationModel;
