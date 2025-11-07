// routes/productRoutes.js
import express from "express";
import Product from "../models/productmodel.js";

const router = express.Router();

// Mock Products (if DB empty)
const defaultProducts = [
  { name: "Laptop", price: 60000 },
  { name: "Headphones", price: 2000 },
  { name: "Keyboard", price: 1200 },
  { name: "Mouse", price: 800 },
  { name: "Smartphone", price: 25000 },
  { name: "Charger", price: 500 }
];

// GET all products
router.get("/", async (req, res) => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(defaultProducts);
  }
  const products = await Product.find();
  res.json(products);
});

export default router;
