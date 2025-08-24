const mongoose = require("mongoose");
const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function leaveClub(req, res) {
  try {
    const { clubId, userId } = req.body;

    if (!clubId || !userId) {
      return res.status(400).json({ 
        message: "clubId and userId are required", 
        success: false, 
        error: true 
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
        error: true 
      });
    }

    // Remove user from club members
    const memberIndex = club.members.findIndex(
      (m) => m.userId.toString() === userId
    );
    if (memberIndex === -1) {
      return res.status(404).json({ 
        message: "You are not a member of this club", 
        success: false, 
        error: true 
      });
    }
    club.members.splice(memberIndex, 1);
    await club.save();

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        message: "User not found", 
        success: false, 
        error: true 
      });
    }

    // Remove the club from user's clubs array
    user.clubs = user.clubs.filter((c) => c.clubId.toString() !== clubId);
    await user.save();

    res.json({
      message: "Successfully left the club",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({ 
      message: err.message || err, 
      success: false, 
      error: true 
    });
  }
}

module.exports = leaveClub;
