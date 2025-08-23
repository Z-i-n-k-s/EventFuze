const clubModel = require("../../models/clubModel");

async function getClubMembers(req, res) {
  try {
    const { clubId } = req.body;

    if (!clubId) {
      return res.status(400).json({ message: "clubId is required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    res.json({
      data: club.members,
      message: "Club members fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = getClubMembers;
