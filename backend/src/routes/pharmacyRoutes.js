import express from "express";
import Pharmacy from "../models/Pharmacy.js";

const router = express.Router();

// POST /pharmacies
router.post("/", async (req, res) => {
  try {
    const pharmacy = await Pharmacy.create(req.body);
    res.status(201).json(pharmacy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /pharmacies
router.get("/", async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.json(pharmacies);
});

export default router;