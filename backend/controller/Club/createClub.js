const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function createClub(req, res) {
  try {
    const { name, description, images, milestones, adminId, adminName } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Club name is required", success: false, error: true });
    }

    // Check if this admin is already managing another club
    if (adminId) {
      const existingClub = await clubModel.findOne({ adminId });
      if (existingClub) {
        return res.status(400).json({
          message: `This user is already an admin of the club "${existingClub.name}".`,
          success: false,
          error: true,
        });
      }
    }

    const members = [];

    if (adminId && adminName) {
      // Add the admin as the President automatically
      members.push({
        userId: adminId,
        role: "President",
        joinedAt: new Date(),
      });

      // Update the user's clubs array and role to CLUB_ADMIN
      await userModel.findByIdAndUpdate(
        adminId,
        {
          $addToSet: { clubs: name }, // Add club to user's clubs array
          $set: { role: "CLUB_ADMIN" } // Update role to CLUB_ADMIN
        },
        { new: true }
      );
    }

    const club = new clubModel({
      name,
      description,
      images,
      milestones,
      adminId,
      adminName,
      members,
    });

    const savedClub = await club.save();

    res.json({
      data: savedClub,
      message: "Club created successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = createClub;
