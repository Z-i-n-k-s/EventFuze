const registrationModel = require("../../models/registrationModel");

const getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required", success: false, error: true });
    }

    const registrations = await registrationModel.find({ eventId });
    res.status(200).json({ data: registrations, message: "Registrations fetched successfully", success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = getRegistrationsByEvent;
