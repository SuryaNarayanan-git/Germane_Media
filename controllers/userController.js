const User = require("../models/userModel");

exports.getPoints = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  res.status(200).json({ userId: user._id, totalPoints: user.points });
};

exports.getHistory = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  res.status(200).json({ userId: user._id, history: user.history });
};
