import { Product } from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId", "name slug");
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getExpensiveProducts = async (req, res) => {
  try {
    const minPrice = Number(req.query.minPrice) || 30000;
    const products = await Product.find({ price: { $gt: minPrice } });
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductsBySpecsRam = async (req, res) => {
  try {
    const ramSize = req.query.ram || "8GB";
    const products = await Product.find({ "specs.ram": ramSize });
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
