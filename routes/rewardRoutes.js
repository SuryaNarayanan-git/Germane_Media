const express = require("express");
const {
  recordActivity,
  redeemReward,
} = require("../controllers/rewardController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/activities", authenticate, recordActivity);
router.post("/redeem", authenticate, redeemReward);

module.exports = router;
