const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function addMember(req, res) {
  try {
    const { clubId, email, role } = req.body;

    if (!clubId || !email) {
      return res.status(400).json({ message: "clubId and email are required", success: false, error: true });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found", success: false, error: true });

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    const exists = club.members.find((m) => m.userId === user._id.toString());
    if (exists) return res.status(400).json({ message: "Member already exists", success: false, error: true });

    // Add member to the club
    const memberData = {
      userId: user._id.toString(),
      role: role || "Member",
      joinedAt: new Date(),
    };
    club.members.push(memberData);
    await club.save();

    // Add club to user's clubs array
    user.clubs.push({
      clubId: club._id.toString(),
      clubName: club.name,
      role: role || "Member",
      joinedAt: new Date(),
    });
    await user.save();

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
