const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const path = require("path");
require("dotenv").config();

// ROUTES
const authRoutes = require("./routes/authRoutes");

const app = express();

// ======================
// ✅ CORS
// ======================
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ======================
// ✅ JSON
// ======================
app.use(express.json());

// ======================
// ✅ API ROUTES
// ======================

// AUTH
app.use("/users", authRoutes);

// TEST
app.get("/users/test", (req, res) => {
  res.send("Users route working");
});

// ======================
// ✅ GET CITIES
// ======================
app.get("/cities", (req, res) => {
  db.query("SELECT * FROM cities", (err, result) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// ======================
// ✅ ADD CITY
// ======================
app.post("/cities", (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = "INSERT INTO cities (name, image) VALUES (?, ?)";

  db.query(sql, [name, image], (err) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ error: "Insert failed" });
    }

    res.json({ message: "City added successfully" });
  });
});

// ======================
// ✅ DELETE CITY
// ======================
app.delete("/cities/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM cities WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Delete Error:", err);
      return res.status(500).json({ error: "Delete failed" });
    }

    res.json({ message: "City deleted successfully" });
  });
});

// ======================
// ✅ ADMIN LOGIN
// ======================
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      token: "dummy-token",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

// ======================
// ✅ SERVE REACT FRONTEND
// ======================
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// ======================
// ✅ ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

// ======================
// ✅ SERVER START
// ======================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});