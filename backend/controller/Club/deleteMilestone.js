const clubModel = require("../../models/clubModel");

async function deleteMilestone(req, res) {
  try {
    const { clubId, milestoneId } = req.body;

    if (!clubId || !milestoneId) {
      return res.status(400).json({ message: "clubId and milestoneId are required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    const milestone = club.milestones.id(milestoneId);
    if (!milestone) return res.status(404).json({ message: "Milestone not found", success: false, error: true });

    milestone.remove();
    await club.save();

    res.json({
      data: club,
      message: "Milestone deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = deleteMilestone;
