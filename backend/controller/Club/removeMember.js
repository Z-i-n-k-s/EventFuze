const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function removeMember(req, res) {
  try {
    const { clubId, userId } = req.body;

    if (!clubId || !userId) {
      return res.status(400).json({ message: "clubId and userId are required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    const memberIndex = club.members.findIndex((m) => m.userId === userId);
    if (memberIndex === -1) return res.status(404).json({ message: "Member not found", success: false, error: true });

    // Remove from club members
    club.members.splice(memberIndex, 1);
    await club.save();

    // Remove club from user's clubs array
    const user = await userModel.findById(userId);
    if (user) {
      user.clubs = user.clubs.filter((c) => c.clubId !== clubId);
      await user.save();
    }

    res.json({
      data: club,
      message: "Member removed successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = removeMember;
