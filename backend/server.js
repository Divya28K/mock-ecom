// server.js
// server.js (No MongoDB version)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock product data
let products = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Headphones", price: 2000 },
  { id: 3, name: "Keyboard", price: 1200 },
  { id: 4, name: "Mouse", price: 800 },
  { id: 5, name: "Smartphone", price: 25000 },
];
let cart = [];

// --- Routes ---
app.get("/", (req, res) => res.send("Mock E-Com API Running"));

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ cart, total });
});

app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const existing = cart.find(i => i.productId === productId);
  if (existing) existing.qty += qty;
  else cart.push({ ...product, productId, qty });

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ cart, total });
});

app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(i => i.productId !== id);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ cart, total });
});

app.post("/api/checkout", (req, res) => {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const receipt = {
    total,
    timestamp: new Date().toISOString(),
  };
  cart = [];
  res.json(receipt);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
