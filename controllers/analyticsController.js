// controllers/analyticsController.js
import Order from "../models/order.js";


// Get overall sales analytics
const getSalesAnalytics = async (req, res, next) => {
  try {
    const analytics = await Order.aggregate([
      {
        $match: { "paymentInfo.status": "paid" }, // only paid orders
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
          totalItemsSold: { $sum: { $size: "$items" } },
          avgOrderValue: { $avg: "$totalAmount" },
        },
      },
    ]);

    res.json({
      success: true,
      analytics: analytics[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        totalItemsSold: 0,
        avgOrderValue: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Revenue by category
const getRevenueByCategory = async (req, res, next) => {
  try {
    const data = await Order.aggregate([
      { $match: { "paymentInfo.status": "paid" } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$productInfo.category",
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          orders: { $sum: 1 },
        },
      },
      { $sort: { revenue: -1 } },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// Top selling products
const getTopProducts = async (req, res, next) => {
  try {
    const topProducts = await Order.aggregate([
      { $match: { "paymentInfo.status": "paid" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
      {
        $project: {
          productId: "$_id",
          name: "$product.name",
          category: "$product.category",
          totalSold: 1,
          revenue: 1,
        },
      },
    ]);

    res.json({ success: true, topProducts });
  } catch (error) {
    next(error);
  }
};

// Daily sales (last 30 days)
const getDailySales = async (req, res,next) => {
  try {
    const dailySales = await Order.aggregate([
      { $match: { "paymentInfo.status": "paid" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, dailySales });
  } catch (error) {
    next(error);
  }
};

export {
  getSalesAnalytics,
  getRevenueByCategory,
  getTopProducts,
  getDailySales,
};
