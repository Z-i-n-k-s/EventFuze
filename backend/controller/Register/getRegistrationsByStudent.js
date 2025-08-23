const registrationModel = require("../../models/registrationModel");

const getRegistrationsByStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required", success: false, error: true });
    }

    const registrations = await registrationModel.find({ studentId });
    res.status(200).json({ data: registrations, message: "Student registrations fetched successfully", success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = getRegistrationsByStudent;
