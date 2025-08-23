const clubModel = require("../../models/clubModel");

async function updateClub(req, res) {
  try {
    const { clubId, name, description, images, milestones, adminId, adminName, members } = req.body;

    if (!clubId) {
      return res.status(400).json({ message: "clubId is required", success: false, error: true });
    }

    const payload = {
      ...(name && { name }),
      ...(description && { description }),
      ...(images && { images }),
      ...(milestones && { milestones }),
      ...(adminId && { adminId }),
      ...(adminName && { adminName }),
      ...(members && { members }),
    };

    const updatedClub = await clubModel.findByIdAndUpdate(clubId, payload, { new: true });

    res.json({
      data: updatedClub,
      message: "Club updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = updateClub;
