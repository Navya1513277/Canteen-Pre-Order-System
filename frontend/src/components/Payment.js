import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./Payment.css";

function Payment() {

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [upiId, setUpiId] =
    useState("");

  // ADD THIS
  const [timeSlot, setTimeSlot] =
    useState("");

  const merchantUpi = "canteen@upi";

  const cartItems =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price),
    0
  );

  const upiLink =
    `upi://pay?pa=${merchantUpi}&pn=Canteen&am=${totalAmount}&cu=INR`;

  const placeOrder = () => {

    if (paymentMethod === "") {
      alert("Select payment method");
      return;
    }

    // TIME SLOT VALIDATION
    if (timeSlot === "") {
      alert("Select time slot");
      return;
    }

    if (
      paymentMethod === "UPI" &&
      upiId === ""
    ) {
      alert("Enter UPI ID");
      return;
    }

    const currentUser =
      localStorage.getItem("loggedInUser");

    const oldOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {

      user: currentUser,

      items: cartItems,

      payment: paymentMethod,

      // SAVE TIME SLOT
      timeSlot: timeSlot,

      date: new Date().toLocaleString(),

      status: "Preparing"
    };

    oldOrders.push(newOrder);

    localStorage.setItem(
      "orders",
      JSON.stringify(oldOrders)
    );

    localStorage.removeItem("cart");

    navigate("/payment-result", {
      state: { success: true }
    });
  };

  return (

    <div className="payment-container">

      <div className="payment-box">

        <h2 className="payment-title">
          Payment
        </h2>

        {/* TIME SLOT */}
        <select
  className="timeslot-select"
  value={timeSlot}
  onChange={(e) => setTimeSlot(e.target.value)}
>

  <option value="">
    Select Time Slot
  </option>

  <option value="9:00 AM - 10:00 AM">
    9:00 AM - 10:00 AM
  </option>

  <option value="10:00 AM - 11:00 AM">
    10:00 AM - 11:00 AM
  </option>

  <option value="11:00 AM - 12:00 PM">
    11:00 AM - 12:00 PM
  </option>

  <option value="12:00 PM - 1:00 PM">
    12:00 PM - 1:00 PM
  </option>

  <option value="1:00 PM - 2:00 PM">
    1:00 PM - 2:00 PM
  </option>

  <option value="2:00 PM - 3:00 PM">
    2:00 PM - 3:00 PM
  </option>

  <option value="3:00 PM - 4:00 PM">
    3:00 PM - 4:00 PM
  </option>

  <option value="4:00 PM - 5:00 PM">
    4:00 PM - 5:00 PM
  </option>

  <option value="5:00 PM - 6:00 PM">
    5:00 PM - 6:00 PM
  </option>

</select>

        {/* COD */}
        <div className="payment-option">

          <input
            type="radio"
            name="payment"
            value="Cash On Delivery"
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />

          <label>
            Cash On Delivery
          </label>

        </div>

        {/* UPI */}
        <div className="payment-option">

          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />

          <label>
            UPI Payment
          </label>

        </div>

        {/* QR */}
        {paymentMethod === "UPI" && (

          <div className="upi-section">

            <QRCodeCanvas
              value={upiLink}
              size={220}
            />

            <input
              type="text"
              placeholder="Enter UPI ID"
              className="upi-input"
              value={upiId}
              onChange={(e) =>
                setUpiId(e.target.value)
              }
            />

          </div>

        )}

        {/* CARD */}
        <div className="payment-option">

          <input
            type="radio"
            name="payment"
            value="Card"
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />

          <label>
            Debit / Credit Card
          </label>

        </div>

        <button
          className="place-order-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Payment;