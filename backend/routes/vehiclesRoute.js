const express = require("express");
const router = express.Router();
const pool = require("../db/db.config");

// ✅ Create a vehicle
router.post("/create-vehicle", (req, res) => {
  const { userId, plateNumber, make, model, color } = req.body;

  if (!userId || !plateNumber) {
    return res
      .status(400)
      .json({ error: "userId and plateNumber are required" });
  }

  const query = `
    INSERT INTO vehicles (userId, plateNumber, make, model, color)
    VALUES (?, ?, ?, ?, ?)
  `;

  pool.query(
    query,
    [userId, plateNumber, make, model, color],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Vehicle added", vehicleId: result.insertId });
    }
  );
});

// ✅ Get all vehicles
router.get("/get-all-vehicles", (req, res) => {
  const query = `
    SELECT v.*, u.name, u.surname, u.email
    FROM vehicles v
    JOIN users u ON v.userId = u.userId
  `;

  pool.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Get vehicle by ID
router.get("/get-vehicle/:vehicleId", (req, res) => {
  const { vehicleId } = req.params;

  pool.query(
    `
    SELECT v.*, u.name, u.surname, u.email
    FROM vehicles v
    JOIN users u ON v.userId = u.userId
    WHERE vehicleId = ?
    `,
    [vehicleId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ error: "Vehicle not found" });
      res.json(results[0]);
    }
  );
});

// ✅ Update vehicle
router.put("/update-vehicle/:vehicleId", (req, res) => {
  const { vehicleId } = req.params;
  const { plateNumber, make, model, color } = req.body;

  const query = `
    UPDATE vehicles
    SET plateNumber = ?, make = ?, model = ?, color = ?
    WHERE vehicleId = ?
  `;

  pool.query(query, [plateNumber, make, model, color, vehicleId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Vehicle updated successfully" });
  });
});

// ✅ Delete vehicle
router.delete("/delete-vehicle/:vehicleId", (req, res) => {
  const { vehicleId } = req.params;

  pool.query("DELETE FROM vehicles WHERE vehicleId = ?", [vehicleId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Vehicle deleted" });
  });
});

module.exports = router;
