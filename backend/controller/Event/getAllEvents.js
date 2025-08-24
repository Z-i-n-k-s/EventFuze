const eventModel = require("../../models/eventModel");

async function getAllEvents(req, res) {
  try {
    const events = await eventModel.find().sort({ createdAt: -1 });
    res.json({
      data: events,
      message: "All events fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = getAllEvents;
