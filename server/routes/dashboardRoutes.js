const express = require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  getDashboardStats
);

module.exports = router;