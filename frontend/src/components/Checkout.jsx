import React, { useEffect, useState } from "react";
import API from "../api.js";

export default function Checkout({ onReceipt }) {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    API.get("/cart").then((res) => setCart(res.data.cart));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/cart/checkout", { cartItems: cart }).then((res) =>
      onReceipt(res.data)
    );
  };

  return (
    <section>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Name:
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </section>
  );
}
