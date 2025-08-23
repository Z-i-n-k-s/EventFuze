const clubModel = require("../../models/clubModel");

async function getClubs(req, res) {
  try {
    const clubs = await clubModel.find();
    res.json({
      data: clubs,
      message: "Clubs fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = getClubs;
