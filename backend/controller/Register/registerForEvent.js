const registrationModel = require("../../models/registrationModel");
const eventModel = require("../../models/eventModel");

const registerForEvent = async (req, res) => {
  try {
    const { studentId, eventId, amountPaid = 0 } = req.body;

    if (!studentId || !eventId) {
      return res.status(400).json({
        message: "Student ID and Event ID are required",
        success: false,
        error: true,
      });
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
        error: true,
      });
    }

    // Check if already registered
    const existingRegistration = await registrationModel.findOne({
      studentId,
      eventId,
      status: "registered",
    });
    if (existingRegistration) {
      return res.status(400).json({
        message: "Student already registered for this event",
        success: false,
        error: true,
      });
    }

    // Check overlapping events
    const studentRegistrations = await registrationModel.find({ studentId, status: "registered" });
    for (const reg of studentRegistrations) {
      const regEvent = await eventModel.findById(reg.eventId);
      if (regEvent.date.toDateString() === event.date.toDateString()) {
        const [startH, startM] = event.startTime.split(":").map(Number);
        const [endH, endM] = event.endTime.split(":").map(Number);
        const [regStartH, regStartM] = regEvent.startTime.split(":").map(Number);
        const [regEndH, regEndM] = regEvent.endTime.split(":").map(Number);

        const eventStart = startH * 60 + startM;
        const eventEnd = endH * 60 + endM;
        const regStart = regStartH * 60 + regStartM;
        const regEnd = regEndH * 60 + regEndM;

        if (eventStart < regEnd && eventEnd > regStart) {
          return res.status(400).json({
            message: `Cannot register: Time overlaps with another registered event from ${regEvent.startTime} to ${regEvent.endTime}`,
            success: false,
            error: true,
          });
        }
      }
    }

    // Check if event is full
    if (event.registeredStudents.length >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full", success: false, error: true });
    }

    // Determine payment status
    let paymentStatus = "not_required";
    let finalAmountPaid = 0;

    if (!event.isFree) {
      if (amountPaid < 0 || amountPaid > event.registrationFee) {
        return res.status(400).json({
          message: `Invalid payment amount. Amount must be between 0 and ${event.registrationFee}`,
          success: false,
          error: true,
        });
      }

      finalAmountPaid = amountPaid;
      paymentStatus = finalAmountPaid === event.registrationFee ? "paid" : "pending";
    }

    // Create registration
    const registration = new registrationModel({
      studentId,
      eventId,
      paymentStatus,
      amountPaid: finalAmountPaid,
      currency: event.currency || "USD",
    });

    const savedRegistration = await registration.save();

    // Update event's registeredStudents
    event.registeredStudents.push(studentId);
    await event.save();

    res.status(201).json({
      data: savedRegistration,
      message: "Registration successful",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = registerForEvent;
