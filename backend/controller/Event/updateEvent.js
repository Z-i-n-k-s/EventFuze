const eventModel = require("../../models/eventModel");

async function updateEvent(req, res) {
  try {
    const { eventId, ...updateFields } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required", success: false, error: true });
    }

    // Automatically adjust isFree if registrationFee changes
    if (updateFields.registrationFee !== undefined) {
      updateFields.isFree = updateFields.registrationFee === 0;
    }

    const updatedEvent = await eventModel.findByIdAndUpdate(
      eventId,
      updateFields,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found", success: false, error: true });
    }

    res.json({
      data: updatedEvent,
      message: "Event updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = updateEvent;
