const multer = require("multer");
const path = require("path");

// Set storage engine for maintenance images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "maintenance-request-images"); // 🔁 Different folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const uploadMaintenanceImages = multer({
  storage,
  fileFilter,
});

module.exports = uploadMaintenanceImages;
