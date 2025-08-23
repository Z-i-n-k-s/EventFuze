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
    } = req.body;

    if (!title || !date || !startTime || !endTime || !location || !clubsId?.length) {
      return res.status(400).json({ message: "Missing required fields", success: false, error: true });
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
      currency: currency || "USD",
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      data: savedEvent,
      message: "Event created successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = createEvent;
