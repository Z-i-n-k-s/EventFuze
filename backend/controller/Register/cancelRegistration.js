const registrationModel = require("../../models/registrationModel");

const cancelRegistration = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;

    if (!studentId || !eventId) {
      return res.status(400).json({ message: "Student ID and Event ID are required", success: false, error: true });
    }

    const registration = await registrationModel.findOne({ studentId, eventId, status: "registered" });
    if (!registration) {
      return res.status(404).json({ message: "Active registration not found", success: false, error: true });
    }

    registration.status = "cancelled";
    await registration.save();

    res.status(200).json({ data: registration, message: "Registration cancelled successfully", success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = cancelRegistration;
