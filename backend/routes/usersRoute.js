const router = require("express").Router();
const pool = require("../db/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const upload = require("../middleware/upload");
const SECRET = "super-secret-key";

// 🟡 Modified route with profile image upload
router.post(
  "/create-user",
  upload.single("profile_picture"),
  async (req, res) => {
    try {
      const { name, surname, email, role, password } = req.body;
      const profile_picture = req.file ? req.file.filename : null;

      if (!name || !surname || !email || !role || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
      INSERT INTO users (name, surname, email, role, password, profile_picture, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

      pool.query(
        query,
        [name, surname, email, role, hashedPassword, profile_picture],
        (err, result) => {
          if (err) return res.status(500).json({ error: err });

          const token = jwt.sign(
            {
              userId: result.insertId,
              name,
              email,
              role,
            },
            SECRET,
            { expiresIn: "2h" }
          );

          res.status(201).json({
            message: "User created successfully",
            token,
            profile_picture,
            user: {
              userId: result.insertId,
              name,
              email,
              role,
            },
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
);

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: "DB error" });
        if (results.length === 0)
          return res.status(404).json({ error: "User not found" });

        const user = results[0];

        // ✅ Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match)
          return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
          {
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          SECRET,
          { expiresIn: "2h" }
        );

        res.status(200).json({
          message: "Login successful",
          token,
          user,
        });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Unexpected error" });
  }
});

router.put(
  "/update-user/:userId",
  upload.single("profile_picture"),
  async (req, res) => {
    const { userId } = req.params;
    const { name, surname, email, role, password } = req.body;
    const profile_picture = req.file ? req.file.filename : null;

    try {
      if (!name || !surname || !email || !role) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // 🔒 Optional: Hash new password if provided
      let updatePassword = "";
      const params = [name, surname, email, role];
      let query = `
        UPDATE users 
        SET name = ?, surname = ?, email = ?, role = ?
      `;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += `, password = ?`;
        params.push(hashedPassword);
      }

      if (profile_picture) {
        query += `, profile_picture = ?`;
        params.push(profile_picture);
      }

      query += `, updatedAt = NOW() WHERE userId = ?`;
      params.push(userId);

      pool.query(query, params, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.json({
          message: "User updated successfully",
          profile_picture, // 👈 Return the new image filename
        });
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: "Unexpected server error" });
    }
  }
);

module.exports = router;
