const express = require("express");
const { getPoints, getHistory } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id/points", authenticate, getPoints);
router.get("/:id/history", authenticate, getHistory);

module.exports = router;
