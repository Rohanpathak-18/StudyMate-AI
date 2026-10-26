const express = require("express");

const {
  uploadDocument,
  getDocuments,
  getDocument,
  reindexDocument,
  deleteDocument,
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/upload", upload.single("document"), uploadDocument);

router.get("/", getDocuments);

router.post("/:id/reindex", reindexDocument);

router.get("/:id", getDocument);

router.delete("/:id", deleteDocument);

module.exports = router;
