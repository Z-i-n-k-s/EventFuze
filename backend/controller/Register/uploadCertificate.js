const registrationModel = require("../../models/registrationModel");

const uploadCertificate = async (req, res) => {
  try {
    const { registrationId, certificateUrl } = req.body;

    if (!registrationId || !certificateUrl) {
      return res.status(400).json({ message: "Registration ID and Certificate URL are required", success: false, error: true });
    }

    const registration = await registrationModel.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found", success: false, error: true });
    }

    registration.certificateUrl = certificateUrl;
    await registration.save();

    res.status(200).json({ data: registration, message: "Certificate uploaded successfully", success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = uploadCertificate;
