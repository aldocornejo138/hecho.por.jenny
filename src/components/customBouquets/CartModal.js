// CartModal.js
import React from "react";
import "./CartModal.css"; // Import your modal styles

const CartModal = ({
  cartItems,
  onClose,
  onItemDelete,
  onQuantityChange,
  productData,
}) => {
  const handleDelete = (index) => {
    onItemDelete(index);
  };

  const handleQuantityChange = (index, newQuantity) => {
    onQuantityChange(index, newQuantity);
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

  return (
    <div className="cart-modal">
      <div className="cart-header">
        <h2>Items In Cart</h2>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <div className="cart-item">
                  <div className="item-info">
                    <p className="item-title">{item.title}</p>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <div className="item-actions">
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
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
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
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
