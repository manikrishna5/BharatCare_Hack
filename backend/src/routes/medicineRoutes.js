import express from "express";
import Medicine from "../models/Medicine.js";

const router = express.Router();

// POST /medicines
router.post("/", async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /medicines
router.get("/", async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

export default router;