const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function deleteClub(req, res) {
  try {
    const { clubId } = req.body;

    if (!clubId) {
      return res.status(400).json({ message: "clubId is required", success: false, error: true });
    }

    // Delete the club
    const deletedClub = await clubModel.findByIdAndDelete(clubId);

    if (!deletedClub) {
      return res.status(404).json({ message: "Club not found", success: false, error: true });
    }

    // Remove the club from all users' clubs array
    await userModel.updateMany(
      { "clubs.clubId": clubId },
      { 
        $pull: { clubs: { clubId: clubId } },
        $set: { role: "STUDENT" } // Reset role to STUDENT
      }
    );

    res.json({
      data: deletedClub,
      message: "Club deleted successfully, all member lists updated, and club admins reset to STUDENT",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = deleteClub;
