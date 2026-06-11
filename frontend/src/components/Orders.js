import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {

  const [preparingOrders, setPreparingOrders] =
    useState([]);

  const [deliveredOrders, setDeliveredOrders] =
    useState([]);

  useEffect(() => {

    const currentUser =
      localStorage.getItem("loggedInUser");

    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // ONLY CURRENT USER ORDERS
    const userOrders = storedOrders.filter(
      (order) => order.user === currentUser
    );

    // PREPARING ORDERS
    const preparing = userOrders.filter(
      (order) => order.status === "Preparing"
    );

    // DELIVERED ORDERS
    const delivered = userOrders.filter(
      (order) => order.status === "Delivered"
    );

    setPreparingOrders(preparing);

    setDeliveredOrders(delivered);

  }, []);
  const markAsDelivered = (index) => {

  const currentUser =
    localStorage.getItem("loggedInUser");

  const allOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const updatedOrders = allOrders.map((order) => {

    if (
      order.user === currentUser &&
      order.status === "Preparing"
    ) {

      order.status = "Delivered";
    }

    return order;

  });

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

  window.location.reload();

};

  return (

    <div className="orders-main-container">

      {/* PREPARING */}
      <div className="orders-column">

        <h1 className="orders-heading">
          Preparing Orders
        </h1>

        {preparingOrders.length === 0 ? (

          <h3>No Preparing Orders</h3>

        ) : (

          preparingOrders.map((order, index) => (

            <div
              className="order-card"
              key={index}
            >

              <h2>
                Order #{index + 1}
              </h2>

              <p>
                Payment :
                <strong>
                  {" "} {order.payment}
                </strong>
              </p>

              <p>
                Time Slot :
                <strong>
                  {" "} {order.timeSlot}
                </strong>
              </p>

              <p>
                Status :
                <strong>
                  {" "} {order.status}
                </strong>
              </p>
              <button
              className="deliver-btn"
              onClick={() => markAsDelivered(index)}
>
              Mark As Delivered
              </button>

              <hr />

              {order.items.map((item, i) => (

                <div
                  className="order-item"
                  key={i}
                >

                  <h3>{item.food_name}</h3>

                  <p>
                    ₹ {item.price}
                  </p>

                </div>

              ))}

            </div>

          ))

        )}

      </div>

      {/* DELIVERED */}
      <div className="orders-column">

        <h1 className="orders-heading">
          Delivered Orders
        </h1>

        {deliveredOrders.length === 0 ? (

          <h3>No Delivered Orders</h3>

        ) : (

          deliveredOrders.map((order, index) => (

            <div
              className="order-card"
              key={index}
            >

              <h2>
                Order #{index + 1}
              </h2>

              <p>
                Payment :
                <strong>
                  {" "} {order.payment}
                </strong>
              </p>

              <p>
                Time Slot :
                <strong>
                  {" "} {order.timeSlot}
                </strong>
              </p>

              <p>
                Status :
                <strong>
                  {" "} {order.status}
                </strong>
              </p>

              <hr />

              {order.items.map((item, i) => (

                <div
                  className="order-item"
                  key={i}
                >

                  <h3>{item.food_name}</h3>

                  <p>
                    ₹ {item.price}
                  </p>

                </div>

              ))}

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default Orders;