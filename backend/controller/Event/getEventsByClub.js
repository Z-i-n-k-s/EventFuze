const eventModel = require("../../models/eventModel");

async function getEventsByClub(req, res) {
  try {
    const { clubId } = req.body;

    if (!clubId) {
      return res.status(400).json({ message: "Club ID is required", success: false, error: true });
    }

    const events = await eventModel.find({ clubsId: clubId }).sort({ createdAt: -1 });

    res.json({
      data: events,
      message: `Events for club ${clubId} fetched successfully`,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = getEventsByClub;
