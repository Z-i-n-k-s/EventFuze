const clubModel = require("../../models/clubModel");

async function addMilestone(req, res) {
  try {
    const { clubId, title, description, date, image } = req.body;

    console.log(req.body)

    if (!clubId || !title) {
      return res.status(400).json({ message: "clubId and title are required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    const milestone = { title, description, date, image };
    club.milestones.push(milestone);

    await club.save();

    res.json({
      data: club,
      message: "Milestone added successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = addMilestone;
