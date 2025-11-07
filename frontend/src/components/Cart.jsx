import React, { useEffect, useState } from "react";
import API from "../api.js";

export default function Cart({ onCheckout }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = () => {
    API.get("/cart").then((res) => {
      setCart(res.data.cart);
      setTotal(res.data.total);
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = (id) => {
    API.delete(`/cart/${id}`).then(fetchCart);
  };

  return (
    <section>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <span>
                {item.name} (x{item.qty})
              </span>
              <span>₹{item.price * item.qty}</span>
              <button onClick={() => removeItem(item._id)}>❌</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={onCheckout}>Proceed to Checkout</button>
        </>
      )}
    </section>
  );
}
