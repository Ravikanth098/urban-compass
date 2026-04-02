const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Routes
app.use("/users", authRoutes);

// Test route
app.get("/users/test", (req, res) => {
  res.send("Users route working");
});

// Get cities
app.get("/cities", (req, res) => {
  db.query("SELECT * FROM cities", (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
});

// Add city
app.post("/cities", (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO cities (name, image) VALUES (?, ?)",
    [name, image],
    (err) => {
      if (err) return res.status(500).json({ error: "Insert failed" });
      res.json({ message: "City added successfully" });
    }
  );
});

// Delete city
app.delete("/cities/:id", (req, res) => {
  db.query("DELETE FROM cities WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "City deleted successfully" });
  });
});

// Admin login
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({ success: true, token: "dummy-token" });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});


// ==========================
// ✅ FRONTEND FIX (IMPORTANT)
// ==========================

// Serve React build files
app.use(express.static(path.join(__dirname, "frontend/build")));

// Catch-all route (FIXED)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});


// Start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});