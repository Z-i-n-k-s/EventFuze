const eventModel = require("../../models/eventModel");

async function getEventsByClub(req, res) {
  try {
    const { clubId } = req.body;

    if (!clubId || typeof clubId !== "string") {
      return res.status(400).json({
        message: "Valid Club ID is required",
        success: false,
        error: true,
      });
    }

    // Fetch events for this club, sorted by newest first, only upcoming events
    const events = await eventModel
      .find({ 
        clubsId: clubId,
        status: { $in: ["upcoming", "ongoing"] } // exclude completed by default
      })
      .sort({ createdAt: -1 });

    if (!events.length) {
      return res.json({
        data: [],
        message: `No events found for club ${clubId}`,
        success: true,
        error: false,
      });
    }

    res.json({
      data: events,
      message: `Events for club ${clubId} fetched successfully`,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error fetching events by club:", err);
    res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
}

module.exports = getEventsByClub;
