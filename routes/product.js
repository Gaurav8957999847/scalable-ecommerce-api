// routes/product.js
import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Create product with up to 5 images
router.post("/", upload.array("images", 5), createProduct); // to limit the number of the minimum images uploaded to 5 by user  

router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
