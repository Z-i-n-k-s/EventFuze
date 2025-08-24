const clubModel = require("../../models/clubModel");
const userModel = require("../../models/userModel");

async function getClubs(req, res) {
  try {
    const clubs = await clubModel.find();
    
    // Populate member names for each club
    const clubsWithMemberNames = await Promise.all(
      clubs.map(async (club) => {
        const clubObj = club.toObject();
        
        // Populate member names
        if (clubObj.members && clubObj.members.length > 0) {
          const memberIds = clubObj.members.map(member => member.userId);
          const users = await userModel.find({ _id: { $in: memberIds } }, 'name');
          
          // Create a map of userId to userName
          const userMap = {};
          users.forEach(user => {
            userMap[user._id.toString()] = user.name;
          });
          
          // Add userName to each member
          clubObj.members = clubObj.members.map(member => ({
            ...member,
            userName: userMap[member.userId] || 'Unknown User'
          }));
        }
        
        return clubObj;
      })
    );
    
    res.json({
      data: clubsWithMemberNames,
      message: "Clubs fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = getClubs;
