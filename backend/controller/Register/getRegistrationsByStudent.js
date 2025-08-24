const registrationModel = require("../../models/registrationModel");
const eventModel = require("../../models/eventModel");

const getRegistrationsByStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required", success: false, error: true });
    }

    // Fetch registrations for the student
    const registrations = await registrationModel.find({ studentId });

    // If no registrations, return empty array
    if (!registrations.length) {
      return res.status(200).json({
        data: [],
        message: "No registrations found for this student",
        success: true,
        error: false,
      });
    }

    // Fetch full event details for each registration
    const registrationsWithEventDetails = await Promise.all(
      registrations.map(async (reg) => {
        const event = await eventModel.findById(reg.eventId); // fetch full event
        return {
          ...reg.toObject(),
          event: event ? event.toObject() : null,
        };
      })
    );

    res.status(200).json({
      data: registrationsWithEventDetails,
      message: "Student registrations fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = getRegistrationsByStudent;
