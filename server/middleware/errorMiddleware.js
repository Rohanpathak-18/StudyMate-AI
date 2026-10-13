const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack || err);

  // Multer errors happen before the controller runs, so translate them here
  // into useful client errors instead of returning a generic 500.
  if (err.name === "MulterError") {
    const statusCode = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    const message = err.code === "LIMIT_FILE_SIZE"
      ? "File size must be less than 10 MB"
      : err.message || "Unable to upload this file";

    return res.status(statusCode).json({
      success: false,
      message,
      error: message,
    });
  }

  if (err.message === "Only PDF, DOCX, PPTX and TXT files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err.message,
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
