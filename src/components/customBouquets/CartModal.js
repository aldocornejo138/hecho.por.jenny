// CartModal.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartModal.css";

const CartModal = ({ cartItems, onClose, onItemDelete, onQuantityChange }) => {
  const navigate = useNavigate();

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

  const goToOrderInfo = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // Navigate to OrderInfo component and pass cartItems as state
    navigate("/orderDetails", { state: { cartItems } });
  };

  return (
    <div>
      <div className="overlayBackground" onClick={onClose} />
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Items In Cart Test/Beta Mode</h2>
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
                <span style={{ color: "black" }}>Sub Total:</span>{" "}
                <span style={{ color: "rgb(0, 255, 94)" }}>
                  ${calculateTotalPrice().toFixed(2)}
                </span>
                <br />
                Shipping: FREE
              </p>
            </div>
            <div className="checkout-btn-container">
              <button
                className="checkout-btn"
                variant="success"
                onClick={goToOrderInfo}
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
