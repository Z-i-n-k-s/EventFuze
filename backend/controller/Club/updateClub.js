const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function updateClub(req, res) {
  try {
    const { clubId, name, description, images, milestones, adminId, adminName } = req.body;

    if (!clubId) {
      return res.status(400).json({ message: "clubId is required", success: false, error: true });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found", success: false, error: true });

    let members = club.members || [];

    if (adminId && adminId !== club.adminId) {
      // Ensure no other member remains President
      members = members.map(m => {
        if (m.role === "President") {
          return { ...m, role: "Member" }; // downgrade any existing President
        }
        return m;
      });

      // Promote new admin
      const newAdminIndex = members.findIndex(m => m.userId === adminId);
      if (newAdminIndex !== -1) {
        members[newAdminIndex].role = "President";
        members[newAdminIndex].joinedAt = members[newAdminIndex].joinedAt || new Date();
      } else {
        members.push({
          userId: adminId,
          role: "President",
          joinedAt: new Date(),
        });
      }

      // Update old admin user role
      if (club.adminId) {
        const oldUser = await userModel.findById(club.adminId);
        if (oldUser && oldUser.role !== "SUPER_ADMIN") {
          await userModel.findByIdAndUpdate(club.adminId, { role: "STUDENT" });
        }
      }

      // Update new admin user role
      await userModel.findByIdAndUpdate(adminId, { role: "CLUB_ADMIN" });
    }

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
