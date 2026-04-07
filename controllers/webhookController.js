// controllers/webhookController.js
import crypto from "crypto";
import Order from "../models/order.js";

const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const event = req.body;

    if (event.event === "payment.captured" || event.event === "order.paid") {
      const orderId = event.payload.payment.entity.notes.orderId;

      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          status: "processing",
          "paymentInfo.status": "paid",
          "paymentInfo.paymentId": event.payload.payment.entity.id,
          "paymentInfo.method": "razorpay",
        });
        console.log(`✅ Payment Successful - Order ${orderId} updated`);
      }
    }
    res.status(200).json({ status: "ok" });
  } else {
    res.status(400).json({ error: "Invalid signature" });
  }
};

export { razorpayWebhook };
