const clubModel = require("../../models/clubModel");

async function createClub(req, res) {
  try {
    const { name, description, images, milestones, adminId, adminName, members } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Club name is required", success: false, error: true });
    }

    const club = new clubModel({
      name,
      description,
      images: images || [],
      milestones: milestones || [],
      adminId,
      adminName,
      members: members || [],
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
