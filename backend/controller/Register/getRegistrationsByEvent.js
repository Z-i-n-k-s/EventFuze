const registrationModel = require("../../models/registrationModel");
const userModel = require("../../models/userModel");

const getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required", success: false, error: true });
    }

    // Fetch registrations for the event
    const registrations = await registrationModel.find({ eventId });

    if (!registrations.length) {
      return res.status(200).json({
        data: [],
        message: "No registrations found for this event",
        success: true,
        error: false,
      });
    }

    // Attach student info (name, email) to each registration
    const registrationsWithStudentInfo = await Promise.all(
      registrations.map(async (reg) => {
        const student = await userModel.findById(reg.studentId).select("name email");
        return {
          registrationId: reg._id,
          registeredAt: reg.registeredAt,
          student: student ? { name: student.name, email: student.email } : null,
          status: reg.status,
          paymentStatus: reg.paymentStatus,
          amountPaid: reg.amountPaid,
        };
      })
    );

    res.status(200).json({
      data: registrationsWithStudentInfo,
      message: "Registrations fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

module.exports = getRegistrationsByEvent;
