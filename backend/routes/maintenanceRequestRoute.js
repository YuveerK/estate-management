const express = require("express");
const router = express.Router();
const pool = require("../db/db.config");
const uploadMaintenanceImages = require("../middleware/uploadMaintenanceImages");

// ✅ Create maintenance request (unlimited images)
router.post(
  "/create-maintenance",
  uploadMaintenanceImages.array("images"),
  (req, res) => {
    const { title, description, unitId, userId, category, priority } = req.body;
    const imagePaths = req.files.map((file) => file.filename);

    const query = `
      INSERT INTO maintenance_requests 
      (title, description, unitId, userId, category, priority, status, images)
      VALUES (?, ?, ?, ?, ?, ?, 'New', ?)
    `;

    pool.query(
      query,
      [
        title,
        description,
        unitId,
        userId,
        category,
        priority,
        JSON.stringify(imagePaths),
      ],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({
          message: "Maintenance request created",
          requestId: result.insertId,
        });
      }
    );
  }
);

// ✅ Get all maintenance requests
router.get("/maintenance-requests", (req, res) => {
  pool.query("SELECT * FROM maintenance_requests", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Get a single request
router.get("/maintenance-request/:requestId", (req, res) => {
  const { requestId } = req.params;
  pool.query(
    "SELECT * FROM maintenance_requests WHERE requestId = ?",
    [requestId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ error: "Request not found" });
      res.json(results[0]);
    }
  );
});

const fs = require("fs");
const path = require("path");

router.put(
  "/update-maintenance/:requestId",
  uploadMaintenanceImages.array("images"),
  (req, res) => {
    const { requestId } = req.params;
    const {
      title,
      description,
      unitId,
      userId,
      category,
      priority,
      existingImages,
    } = req.body;

    const existing = existingImages ? JSON.parse(existingImages) : [];
    const uploaded = req.files.map((file) => file.filename);
    const finalImages = [...existing, ...uploaded];

    // 🔥 Step 1: Get current images from DB
    const getImagesQuery = `SELECT images FROM maintenance_requests WHERE requestId = ?`;

    pool.query(getImagesQuery, [requestId], (err, results) => {
      if (err) {
        console.error("Error fetching existing images:", err);
        return res.status(500).json({ error: err });
      }

      const currentImages = results[0]?.images
        ? JSON.parse(results[0].images)
        : [];

      // 🔥 Step 2: Determine which images were removed
      const removedImages = currentImages.filter(
        (img) => !finalImages.includes(img)
      );

      // 🔥 Step 3: Delete removed images from disk
      removedImages.forEach((img) => {
        const imgPath = path.join(
          __dirname,
          "..",
          "maintenance-request-images",
          img
        );
        fs.unlink(imgPath, (err) => {
          if (err) console.warn(`Failed to delete ${img}:`, err.message);
        });
      });

      // 🔥 Step 4: Update the DB with final images
      const updateQuery = `
        UPDATE maintenance_requests
        SET title = ?, description = ?, unitId = ?, userId = ?, category = ?, priority = ?, images = ?
        WHERE requestId = ?
      `;

      pool.query(
        updateQuery,
        [
          title,
          description,
          unitId,
          userId,
          category,
          priority,
          JSON.stringify(finalImages),
          requestId,
        ],
        (err) => {
          if (err) {
            console.error("Error updating request:", err);
            return res.status(500).json({ error: err });
          }
          res.json({ message: "Maintenance request updated successfully" });
        }
      );
    });
  }
);

// ✅ Delete request
router.delete("/delete-maintenance/:requestId", (req, res) => {
  const { requestId } = req.params;
  pool.query(
    "DELETE FROM maintenance_requests WHERE requestId = ?",
    [requestId],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Maintenance request deleted" });
    }
  );
});

module.exports = router;
