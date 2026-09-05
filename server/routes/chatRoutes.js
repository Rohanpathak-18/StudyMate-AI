const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  askQuestion,
} = require("../controllers/chatController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  askQuestion
);

module.exports = router;