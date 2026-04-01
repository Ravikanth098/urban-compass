import express from "express";
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/dashboard", verifyToken, verifyAdmin, (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, users) => {
    stats.totalUsers = users[0].totalUsers;

    db.query("SELECT COUNT(*) AS totalCities FROM cities", (err, cities) => {
      stats.totalCities = cities[0].totalCities;

      db.query("SELECT COUNT(*) AS totalBookings FROM bookings", (err, bookings) => {
        stats.totalBookings = bookings[0].totalBookings;

        res.json(stats);
      });
    });
  });
});

export default router;