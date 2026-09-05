const express = require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  generateFlashcards,
  getFlashcards,
} =
  require("../controllers/flashcardController");


const router =
  express.Router();


router.use(
  authMiddleware
);


router.post(
  "/generate",
  generateFlashcards
);


router.get(
  "/",
  getFlashcards
);


module.exports = router;