const mongoose = require("mongoose");
const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function createClub(req, res) {
  try {
    const { name, description, images, milestones, adminId, adminName } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Club name is required",
        success: false,
        error: true,
      });
    }

    // Validate adminId format if provided
    if (adminId && !mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({
        message: "Invalid adminId",
        success: false,
        error: true,
      });
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

    // Prepare members array with admin as President
    const members = [];
    if (adminId && adminName) {
      members.push({
        userId: adminId,
        role: "President",
        joinedAt: new Date(),
      });
    }

    // Create new club
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

    // Update user's clubs array after saving club
    if (adminId && adminName) {
      await userModel.findByIdAndUpdate(
        adminId,
        {
          $addToSet: {
            clubs: {
              clubId: savedClub._id.toString(),
              clubName: savedClub.name,
              role: "President",        // Set correct club role
              joinedAt: new Date(),     // Add joined date
            },
          },
          $set: { role: "CLUB_ADMIN" }, // Set global user role
        },
        { new: true }
      );
    }

    // Return success response
    res.json({
      data: savedClub,
      message: "Club created successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = createClub;
