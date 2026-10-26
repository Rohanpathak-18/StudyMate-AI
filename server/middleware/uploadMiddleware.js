const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();

const allowedExtensions = [".pdf", ".docx", ".pptx", ".txt"];

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return cb(
      new Error("Only PDF, DOCX, PPTX and TXT files are allowed")
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = upload;
