import React, { useState } from "react";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import ReceiptModal from "./components/ReceiptModal.jsx";

export default function App() {
  const [view, setView] = useState("products");
  const [receipt, setReceipt] = useState(null);

  return (
    <div className="container">
      <header>
        <h1>🛒 Mock E-Com Cart</h1>
        <nav>
          <button onClick={() => setView("products")}>Products</button>
          <button onClick={() => setView("cart")}>Cart</button>
        </nav>
      </header>

      {view === "products" && <ProductList />}
      {view === "cart" && (
        <Cart
          onCheckout={() => setView("checkout")}
        />
      )}
      {view === "checkout" && (
        <Checkout
          onReceipt={(data) => {
            setReceipt(data);
            setView("receipt");
          }}
        />
      )}
      {view === "receipt" && receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setView("products")} />
      )}
    </div>
  );
}
