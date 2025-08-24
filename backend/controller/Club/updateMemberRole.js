const clubModel = require("../../models/clubModel");

async function updateMemberRole(req, res) {
  try {
    const { clubId, userId, role } = req.body;

    if (!clubId || !userId || !role) {
      return res.status(400).json({ message: "clubId, userId and role are required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    const member = club.members.find((m) => m.userId === userId);
    if (!member) return res.status(404).json({ message: "Member not found", success: false, error: true });

    member.role = role;
    await club.save();

    res.json({
      data: club,
      message: "Member role updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = updateMemberRole;
