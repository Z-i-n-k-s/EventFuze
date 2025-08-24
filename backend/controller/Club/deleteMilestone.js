const clubModel = require("../../models/clubModel");

async function deleteMilestone(req, res) {
  try {
    const { clubId, milestoneId } = req.body;

    if (!clubId || !milestoneId) {
      return res.status(400).json({ message: "clubId and milestoneId are required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found", success: false, error: true });
    }

    const updatedClub = await clubModel.findByIdAndUpdate(
      clubId,
      { $pull: { milestones: { _id: milestoneId } } },
      { new: true }
    );

    res.json({
      data: updatedClub,
      message: "Milestone deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = deleteMilestone;
