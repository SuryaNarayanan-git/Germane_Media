const User = require("../models/userModel");

exports.recordActivity = async (req, res) => {
  const { activity } = req.body;

  const pointsMap = {
    watch: 10,
    review: 20,
    share: 15,
  };

  const points = pointsMap[activity];
  if (!points) {
    return res.status(400).json({ error: "Invalid activity type." });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  user.points += points;
  user.history.push({ type: "earn", activity, points });
  await user.save();

  res
    .status(200)
    .json({ message: "Points awarded.", totalPoints: user.points });
};

exports.redeemReward = async (req, res) => {
  const { rewardName, cost } = req.body;

  if (!rewardName || !cost) {
    return res
      .status(400)
      .json({ error: "Reward name and cost are required." });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  if (user.points == 0) {
    return res.status(400).json({ error: "there is no points" });
  }
  if (user.points < 100) {
    return res
      .status(400)
      .json({ error: "You need at least 100 points to redeem a reward." });
  }

  if (user.points < cost) {
    return res
      .status(400)
      .json({ error: "Insufficient points for redemption." });
  }

  user.points -= cost;
  user.history.push({ type: "redeem", reward: rewardName, points: -cost });
  await user.save();

  res
    .status(200)
    .json({ message: "Reward redeemed.", totalPoints: user.points });
};
