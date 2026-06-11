import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  const navigate = useNavigate();

  const currentUser =
    localStorage.getItem("loggedInUser");
    
  const firstLetter =
    currentUser
      ? currentUser.charAt(0).toUpperCase()
      : "";

  const logoutUser = () => {

    localStorage.removeItem("loggedInUser");

    navigate("/login");
  };

  return (

    <nav className="navbar navbar-expand-lg custom-navbar">

      <div className="container-fluid">

        <Link
          className="navbar-brand title"
          to="/"
        >
          🍕🍔🍟 Canteen Pre-Order System 🍟🍔🍕
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className="nav-link nav-hover"
                to="/menu"
              >
                Menu
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link nav-hover"
                to="/cart"
              >
                Cart
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link nav-hover"
                to="/orders"
              >
                Orders
              </Link>
            </li>

            {!currentUser ? (

              <>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-hover"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                
              </>

            ) : (

              <>
                {/* PROFILE CIRCLE */}
                <li className="nav-item profile-circle">

                  {firstLetter}

                </li>

                {/* EMAIL */}
                <li className="nav-item email-text">

                  {currentUser}

                </li>

                {/* LOGOUT */}
                <li className="nav-item">

                  <button
                    className="logout-btn"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>

                </li>
              </>

            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;