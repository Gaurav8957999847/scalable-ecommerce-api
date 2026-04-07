//for handling payment related operations normal api calls and also for creating the order in razorpay and returning the order details to the client
import Razorpay from 'razorpay';
import Order from "../models/order.js";


const createRazorpayOrder = async (req,res,next) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    //checking if the order does not exist
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }

    if (order.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized to pay for this order");
    }

    //creating a new payment order
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(order.totalAmount * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        orderId: order._id.toString(),
      },
    };
    //creating the order in razorpay
    const razorpayOrder = await razorpay.orders.create(options);
    //returning the status and the order details to the client
    res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
}

export { createRazorpayOrder };