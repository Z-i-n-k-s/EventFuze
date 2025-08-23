const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function updateClub(req, res) {
  try {
    const { clubId, name, description, images, milestones, adminId, adminName } = req.body;

    if (!clubId) {
      return res.status(400).json({ message: "clubId is required", success: false, error: true });
    }

    // Find the current club
    const club = await clubModel.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found", success: false, error: true });
    }

    let members = club.members || [];

    // Handle admin change
    if (adminId && adminId !== club.adminId) {
      // Find the old admin in members
      const oldAdminIndex = members.findIndex(m => m.userId === club.adminId);
      if (oldAdminIndex !== -1) {
        members[oldAdminIndex].role = "Member"; // downgrade old admin to member
      }

      // Update new admin in members
      const newAdminIndex = members.findIndex(m => m.userId === adminId);
      if (newAdminIndex !== -1) {
        members[newAdminIndex].role = "President"; // promote to President
        members[newAdminIndex].joinedAt = members[newAdminIndex].joinedAt || new Date();
      } else {
        // Add new admin if not already a member
        members.push({
          userId: adminId,
          role: "President",
          joinedAt: new Date(),
        });
      }

      // Update user roles
      // Downgrade old admin (if not SUPER_ADMIN)
      if (club.adminId) {
        const oldUser = await userModel.findById(club.adminId);
        if (oldUser && oldUser.role !== "SUPER_ADMIN") {
          await userModel.findByIdAndUpdate(club.adminId, { role: "STUDENT" });
        }
      }

      // Upgrade new admin
      await userModel.findByIdAndUpdate(adminId, { role: "CLUB_ADMIN", $addToSet: { clubs: club.name } });
    }

    // Prepare payload for club update
    const payload = {
      ...(name && { name }),
      ...(description && { description }),
      ...(images && { images }),
      ...(milestones && { milestones }),
      ...(adminId && { adminId }),
      ...(adminName && { adminName }),
      members,
    };

    const updatedClub = await clubModel.findByIdAndUpdate(clubId, payload, { new: true });

    res.json({
      data: updatedClub,
      message: "Club updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = updateClub;