const eventModel = require("../../models/eventModel");

async function createEvent(req, res) {
  try {
    const {
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      location,
      maxParticipants,
      clubsId,
      images,
      createdBy,
      registrationFee,
      currency,
      registrationStart,
      registrationDeadline,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !date ||
      !startTime ||
      !endTime ||
      !location ||
      !clubsId?.length ||
      !registrationStart ||
      !registrationDeadline
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
        error: true,
      });
    }

    // Ensure registration dates are valid
    if (new Date(registrationDeadline) < new Date(registrationStart)) {
      return res.status(400).json({
        message: "Registration deadline cannot be before registration start date",
        success: false,
        error: true,
      });
    }

    const newEvent = new eventModel({
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      location,
      maxParticipants: maxParticipants || 100,
      clubsId,
      images: images || [],
      createdBy,
      registrationFee: registrationFee || 0,
      currency: currency || "BDT",
      registrationStart,
      registrationDeadline,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      data: savedEvent,
      message: "Event created successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = createEvent;