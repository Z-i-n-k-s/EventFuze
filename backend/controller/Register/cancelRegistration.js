const registrationModel = require("../../models/registrationModel");
const eventModel = require("../../models/eventModel");

const cancelRegistration = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;

    if (!studentId || !eventId) {
      return res.status(400).json({
        message: "Student ID and Event ID are required",
        success: false,
        error: true,
      });
    }

    // Find active registration
    const registration = await registrationModel.findOne({
      studentId,
      eventId,
      status: "registered",
    });

    if (!registration) {
      return res.status(404).json({
        message: "Active registration not found",
        success: false,
        error: true,
      });
    }

    // Mark registration as cancelled
    registration.status = "cancelled";
    await registration.save();

    // Remove student from event's registeredStudents array
    const event = await eventModel.findById(eventId);
    if (event) {
      event.registeredStudents = event.registeredStudents.filter(
        (id) => id !== studentId
      );
      await event.save();
    }

    res.status(200).json({
      data: registration,
      message: "Registration cancelled successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = cancelRegistration;
