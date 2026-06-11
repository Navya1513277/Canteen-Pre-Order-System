import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">

        <h1 className="welcome-title">
          Welcome To The Canteen
        </h1>

        <p className="welcome-text">
          Pre Order Your Favorite Food Quickly & Easily
        </p>

        <div className="mt-4">
          <Link to="/login">
            <button className="btn btn-warning me-3 home-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="btn btn-light home-btn">
              Register
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;