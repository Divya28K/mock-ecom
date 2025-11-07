// models/cartModel.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  qty: Number
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
