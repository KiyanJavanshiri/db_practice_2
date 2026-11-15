import express from "express";
import {
  createProduct,
  getProducts,
  getExpensiveProducts,
  getProductsBySpecsRam,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/expensive", getExpensiveProducts);
router.get("/search-specs", getProductsBySpecsRam);

export default router;
