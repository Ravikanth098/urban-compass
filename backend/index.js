const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use("/users", authRoutes);

app.get("/users/test", (req, res) => {
  res.send("Users route working");
});

app.get("/cities", (req, res) => {
  db.query("SELECT * FROM cities", (err, result) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

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

app.use(express.static(path.join(__dirname, "frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});