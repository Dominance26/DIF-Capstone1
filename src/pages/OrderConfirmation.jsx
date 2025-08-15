import React from "react";
import { Link } from "react-router-dom";
import '../styles/OrderConfirmation.css';


const OrderConfirmation = ({ cartItems }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-confirmation">
      <h2>🎉 Order Confirmed!</h2>
      <p>Thank you for your purchase.</p>

      <div className="order-summary">
        <h3>Order Summary:</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="order-total">Total: ${totalPrice.toFixed(2)}</div>
      </div>

      <Link to="/" className="home-link">
        🏠 Back to Home
      </Link>
    </div>
  );
};

export default OrderConfirmation;
