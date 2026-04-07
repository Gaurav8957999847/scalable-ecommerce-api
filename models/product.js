// models/product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
