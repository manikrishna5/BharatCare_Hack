import {
  createOrder,
  updateOrderStatus,
  getMyOrders,
} from "../controllers/orderController.js";
import express from "express";


import protect from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/create", protect, allowRoles("patient"), createOrder);
router.patch("/update", protect, allowRoles("pharmacy"), updateOrderStatus);
router.get("/my", protect, allowRoles("patient"), getMyOrders);

export default router;