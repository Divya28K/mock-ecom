import React, { useEffect, useState } from "react";
import API from "../api.js";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = (id) => {
    API.post("/cart", { productId: id, qty: 1 }).then(() =>
      alert("✅ Added to cart!")
    );
  };

  return (
    <section>
      <h2>Products</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p._id} className="card">
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
