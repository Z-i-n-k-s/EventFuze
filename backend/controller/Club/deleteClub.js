const clubModel = require("../../models/clubModel");

async function deleteClub(req, res) {
  try {
    const { clubId } = req.body;

    if (!clubId) {
      return res.status(400).json({ message: "clubId is required", success: false, error: true });
    }

    const deletedClub = await clubModel.findByIdAndDelete(clubId);

    if (!deletedClub) {
      return res.status(404).json({ message: "Club not found", success: false, error: true });
    }

    res.json({
      data: deletedClub,
      message: "Club deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = deleteClub;
