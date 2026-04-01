import express from "express";
import upload from "../middleware/upload.js";
import { getCities, addCity } from "../controllers/cityController.js";

const router = express.Router();

router.get("/cities", getCities);

router.post("/add-city", upload.single("image"), addCity);

export default router;