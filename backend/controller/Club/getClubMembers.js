const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function getClubMembers(req, res) {
  try {
    const { clubId } = req.body;

    if (!clubId) {
      return res.status(400).json({ message: "clubId is required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    // Fetch user details for each member
    const membersWithDetails = await Promise.all(
      club.members.map(async (member) => {
        const user = await userModel.findById(member.userId).select("name profilePic");
        return {
          userId: member.userId,
          role: member.role,
          joinedAt: member.joinedAt,
          name: user ? user.name : "Unknown",
          profilePic: user ? user.profilePic : null,
        };
      })
    );

    res.json({
      data: membersWithDetails,
      message: "Club members fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = getClubMembers;
