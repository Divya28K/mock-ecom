// routes/cartRoutes.js
import express from "express";
import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// GET cart items
router.get("/", async (req, res) => {
  const cart = await Cart.find();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ cart, total });
});

// POST add item
router.post("/", async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);

  if (!product) return res.status(404).json({ message: "Product not found" });

  let existing = await Cart.findOne({ productId });
  if (existing) {
    existing.qty += qty;
    await existing.save();
  } else {
    await Cart.create({
      productId,
      name: product.name,
      price: product.price,
      qty,
    });
  }

  const cart = await Cart.find();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ message: "Added to cart", cart, total });
});

// DELETE item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id);
  const cart = await Cart.find();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ message: "Removed item", cart, total });
});

// POST checkout
router.post("/checkout", async (req, res) => {
  const cartItems = await Cart.find();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const receipt = {
    receiptId: uuidv4(),
    timestamp: new Date().toISOString(),
    total,
  };
  await Cart.deleteMany({});
  res.json(receipt);
});

export default router;
