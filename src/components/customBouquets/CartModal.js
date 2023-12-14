// CartModal.js
import React from "react";
import "./CartModal.css"; // Import your modal styles
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "sk_test_51OMEiVI1zNR8sZYDhbr9NCc7zuiymsX9kFPFLf73mubeF28mu2nrjFspwD70eBu5hRXDpCUUGhCZgOlGVDUnxjLT00i5i8Davv"
);

const CartModal = ({ cartItems, onClose, onItemDelete, onQuantityChange }) => {
  const handleDelete = (index) => {
    onItemDelete(index);
  };

  const handleQuantityChange = (index, newQuantity) => {
    // Ensure that the new quantity is greater than or equal to zero
    if (newQuantity >= 0) {
      onQuantityChange(index, newQuantity);
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = item.quantity || 0;

      if (!isNaN(itemPrice)) {
        return total + itemPrice * itemQuantity;
      } else {
        console.error(`Invalid price for item: ${item.title}`);
        return total;
      }
    }, 0);

    return totalPrice;
  };

  const checkout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }), // Send cart items to your server
    });

    const session = await response.json();

    // Redirect to Checkout Session
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
      // Handle errors
    }
  };
  return (
    <div>
      <div className="overlayBackground" onClick={onClose} />
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Items In Cart</h2>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p>No Items In Cart</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="cart-item">
                    <div className="item-info">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="miniature-image"
                      />
                      <p className="item-title">{item.title}</p>
                      <p className="item-price">${item.price}</p>

                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(index, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(index, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="item-actions">
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-price">
              <p>
                Sub Total: ${calculateTotalPrice().toFixed(2)}
                <br />
                Shipping: FREE
              </p>
            </div>
            <div className="checkout-btn-container">
              <button
                className="checkout-btn"
                variant="success"
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
