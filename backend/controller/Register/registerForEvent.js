const registrationModel = require("../../models/registrationModel");
const eventModel = require("../../models/eventModel");

const registerForEvent = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;

    if (!studentId || !eventId) {
      return res.status(400).json({ message: "Student ID and Event ID are required", success: false, error: true });
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found", success: false, error: true });
    }

    // Check if the student is already registered
    const existingRegistration = await registrationModel.findOne({ studentId, eventId, status: "registered" });
    if (existingRegistration) {
      return res.status(400).json({ message: "Student already registered for this event", success: false, error: true });
    }

    // Check if event is full
    if (event.registeredStudents.length >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full", success: false, error: true });
    }

    // Create registration
    const registration = new registrationModel({
      studentId,
      eventId,
      paymentStatus: event.isFree ? "not_required" : "pending",
      amountPaid: 0,
      currency: event.currency || "USD",
    });

    const savedRegistration = await registration.save();

    // Update the event's registeredStudents array
    event.registeredStudents.push(studentId);
    await event.save();

    res.status(201).json({ data: savedRegistration, message: "Registration successful", success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = registerForEvent;
