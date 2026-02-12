import express from "express";
import upload from "../middleware/upload.js";
import Prescription from "../models/Prescription.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("prescription"),
  async (req, res) => {
    try {
      const newPrescription = new Prescription({
        userId: req.user.id,
        filePath: req.file.path,
      });

      await newPrescription.save();

      res.status(200).json({
        message: "Prescription uploaded successfully",
        filePath: req.file.path,
      });
    } catch (error) {
      res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);
router.get("/", protect, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      userId: req.user.id,
    });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prescriptions" });
  }
});
export default router;