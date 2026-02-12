import express from "express";
import protect from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
// GET /doctors/all (Admin only)
const router = express.Router();
console.log("Doctor routes loaded");
import {
  createDoctorProfile,
  getDoctorsAvailability,
  approveDoctor,
  getAllDoctorsAdmin
} from "../controllers/doctorController.js";

// Doctor creates own profile
router.get(
  "/all",
  protect,
  allowRoles("admin"),
  (req, res, next) => {
    console.log("Admin route hit");
    next();
  },
  getAllDoctorsAdmin
);
router.post("/profile", protect, allowRoles("doctor"), createDoctorProfile);

// Anyone logged in can view availability
router.get("/availability", protect, getDoctorsAvailability);


// Only admin can approve
router.patch(
  "/:id/approve",
  protect,
  allowRoles("admin"),
  approveDoctor
);

export default router;