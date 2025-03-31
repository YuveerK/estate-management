const express = require("express");
const router = express.Router();
const pool = require("../db/db.config");

// ✅ Create new resident
router.post("/create-resident", (req, res) => {
  const {
    userId,
    idNumber,
    phoneNumber,
    emergencyContact,
    numberOfOccupants,
    pets,
  } = req.body;

  const query = `
    INSERT INTO residents (
      userId,  idNumber, phoneNumber, emergencyContact,
      numberOfOccupants, pets, accountCreated
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(
    query,
    [
      userId,
      idNumber,
      phoneNumber,
      emergencyContact,
      numberOfOccupants,
      pets,
      true,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Resident created", residentId: result.insertId });
    }
  );
});

// ✅ Get all residents
router.get("/get-all-residents", (req, res) => {
  pool.query(
    `
        SELECT u.userId, 
        u.name, 
        u.surname, 
        u.email, 
        u.role, 
        u.profile_picture, 
        r.idNumber, 
        r.phoneNumber, 
        r.emergencyContact, 
        r.numberOfOccupants, 
        r.pets, 
        r.accountCreated,
        v.vehicleId, 
        v.plateNumber, 
        v.make, 
        v.model, 
        v.color
        FROM residents r
        JOIN users u ON r.userId = u.userId
        LEFT JOIN vehicles v ON v.userId = r.userId
        WHERE u.role != 'admin'

    `,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// ✅ Get single resident by ID
router.get("/get-resident/:userId", (req, res) => {
  const { userId } = req.params;

  pool.query(
    `
      SELECT r.*, u.name, u.surname, u.email
      FROM residents r
      JOIN users u ON r.userId = u.userId
      WHERE r.userId = ?
      `,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      console.log(results);
      if (results.length === 0)
        return res.status(404).json({ error: "Resident not found" });
      res.json(results[0]); // includes r.accountCreated
    }
  );
});

// ✅ Update resident
router.put("/update-resident/:residentId", (req, res) => {
  const { residentId } = req.params;
  const {
    idNumber,
    phoneNumber,
    emergencyContact,
    numberOfOccupants,
    pets,
    accountCreated,
  } = req.body;

  pool.query(
    `
    UPDATE residents
    SET idNumber = ?, phoneNumber = ?, emergencyContact = ?, 
        numberOfOccupants = ?, pets = ?, accountCreated = ?
    WHERE residentId = ?
    `,
    [
      idNumber,
      phoneNumber,
      emergencyContact,
      numberOfOccupants,
      pets,
      accountCreated,
      residentId,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Resident updated successfully" });
    }
  );
});

// ✅ Delete resident
router.delete("/:residentId", (req, res) => {
  const { residentId } = req.params;

  pool.query(
    "DELETE FROM residents WHERE residentId = ?",
    [residentId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Resident deleted" });
    }
  );
});

module.exports = router;
