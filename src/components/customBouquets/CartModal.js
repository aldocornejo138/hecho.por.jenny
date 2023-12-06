// CartModal.js
import React from "react";
import "./CartModal.css"; // Import your modal styles

const CartModal = ({ cartItems, onClose }) => {
  return (
    <div className="cart-modal">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.title} - {item.price}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CartModal;
