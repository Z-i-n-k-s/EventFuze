const clubModel = require("../../models/clubModel");

async function addMember(req, res) {
  try {
    const { clubId, userId, role } = req.body;

    if (!clubId || !userId) {
      return res.status(400).json({ message: "clubId and userId are required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    const exists = club.members.find((m) => m.userId === userId);
    if (exists) return res.status(400).json({ message: "Member already exists", success: false, error: true });

    club.members.push({
      userId,
      role: role || "Member",
      joinedAt: new Date(),
    });

    await club.save();

    res.json({
      data: club,
      message: "Member added successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = addMember;
