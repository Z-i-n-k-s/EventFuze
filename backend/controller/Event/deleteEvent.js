const eventModel = require("../../models/eventModel");

async function deleteEvent(req, res) {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required", success: false, error: true });
    }

    const deletedEvent = await eventModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found", success: false, error: true });
    }

    res.json({
      message: "Event deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = deleteEvent;
