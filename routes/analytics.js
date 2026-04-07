// routes/analytics.js
import express from "express";
import {
  getSalesAnalytics,
  getRevenueByCategory,
  getTopProducts,
  getDailySales,
} from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getSalesAnalytics);
router.get("/category", protect, getRevenueByCategory);
router.get("/top-products", protect, getTopProducts);
router.get("/daily", protect, getDailySales);

export default router;
