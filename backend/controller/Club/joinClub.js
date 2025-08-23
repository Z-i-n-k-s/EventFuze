const clubModel = require("../../models/clubModel");

async function joinClub(req, res) {
  try {
    const { clubId, userId } = req.body;

    if (!clubId || !userId) {
      return res.status(400).json({ message: "clubId and userId are required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    // Check if student is already a member
    const exists = club.members.find((m) => m.userId === userId);
    if (exists) {
      return res.status(400).json({ message: "You are already a member of this club", success: false, error: true });
    }

    // Add student as a member
    club.members.push({
      userId,
      role: "Member",
      joinedAt: new Date(),
    });

    await club.save();

    res.json({
      data: club,
      message: "Successfully joined the club",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = joinClub;
