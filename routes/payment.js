import express from "express";
import { createRazorpayOrder } from "../controllers/paymentController.js";
import { razorpayWebhook } from "../controllers/webhookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a Razorpay order
router.post("/create-order", protect, createRazorpayOrder);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook,
);

export default router;
