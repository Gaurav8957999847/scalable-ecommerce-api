import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";

dotenv.config();

const app = express();



const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// ✅ Middlewares
app.use(cors()); // this will take care of the cors error when the frontend tries to connect to the backend
app.use(express.json()); // this will take care of the error when we try to send json data from the frontend to the backend and the backend is not able to parse it

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("E-Commerce API is running 🚀");
});

app.use(errorHandler); // Global error handler
const start = async () => {
  try {
    // Connect to MongoDB
    const connectionDB = await mongoose.connect(MONGO_URL);
    console.log(`✅ MongoDB Connected! Host: ${connectionDB.connection.host}`);

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Error starting server: ${error.message}`);
  }
};

start();