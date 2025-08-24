const mongoose = require("mongoose");
const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function joinClub(req, res) {
  try {
    const { clubId, userId } = req.body;

    if (!clubId || !userId) {
      return res.status(400).json({
        message: "clubId and userId are required",
        success: false,
        error: true,
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(clubId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid clubId or userId",
        success: false,
        error: true,
      });
    }

    // Find the club
    const club = await clubModel.findById(clubId);
    if (!club) {
      return res.status(404).json({
        message: "Club not found",
        success: false,
        error: true,
      });
    }

    // Check if user is already a member of the club
    const existsInClub = club.members.find(
      (m) => m.userId.toString() === userId
    );
    if (existsInClub) {
      return res.status(400).json({
        message: "You are already a member of this club",
        success: false,
        error: true,
      });
    }

    // Add user to club members
    club.members.push({
      userId,
      role: "Member",
      joinedAt: new Date(),
    });
    await club.save();

    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    // Add club to user's profile if not already added
    const existsInUser = user.clubs.find(
      (c) => c.clubId.toString() === clubId
    );
    if (!existsInUser) {
      user.clubs.push({
        clubId: club._id.toString(),
        clubName: club.name,
      });
      await user.save();
    }

    // Prepare safe user object
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.resetToken;
    delete safeUser.resetTokenExpiry;

    res.json({
      data: { club, user: safeUser },
      message: "Successfully joined the club",
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

module.exports = joinClub;
