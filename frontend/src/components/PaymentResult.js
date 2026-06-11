import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentResult.css";

function PaymentResult() {

  const location = useLocation();
  const navigate = useNavigate();

  const success = location.state?.success;

  return (

    <div className="payment-result-container">

      {success ? (

        <div className="success-box">

          <h1>🎉 Order Successful 🎉</h1>

          <p>
            Your order has been placed successfully.
          </p>

          <button
            className="back-btn"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </button>

        </div>

      ) : (

        <div className="failed-box">

          <h1>❌ Order Failed ❌</h1>

          <p>
            Payment was unsuccessful.
          </p>

          <button
            className="back-btn"
            onClick={() => navigate("/cart")}
          >
            Try Again
          </button>

        </div>

      )}

    </div>
  );
}

export default PaymentResult;