import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const loginUser = async () => {

  try {

    const res = await axios.post(
      'http://localhost:5000/login',
      {
        email,
        password,
        role
      }
    );

    // STORE USER
    localStorage.setItem(
      "loggedInUser",
      email
    );

    localStorage.setItem(
      "userRole",
      role
    );

    // REDIRECT
    if (role === "admin") {

      window.location.href = "/admin";

    } else {

      window.location.href = "/menu";

    }

  } catch (error) {

    if (error.response) {

      alert(error.response.data.message);

    } else {

      alert('Server Error');

    }

  }

};


  return (

    <div className="login-container">

      <div className="login-card">

        <h2 className="text-center mb-4">
          Login
        </h2>

        {/* ROLE SELECT */}
        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >

          <option value="user">
            User Login
          </option>

          <option value="admin">
            Admin Login
          </option>

        </select>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* LOGIN BUTTON */}
        <button
          className="btn btn-primary w-100"
          onClick={loginUser}
        >
          Login
        </button>

        {/* FORGOT PASSWORD */}
        <p className="mt-3 text-center">

          <a href="/">
            Forgot Password?
          </a>

        </p>

        {/* REGISTER */}
        <p className="text-center">

          Not Registered?

          <a href="/register">
            {" "}Register Here
          </a>

        </p>

      </div>

    </div>
  );
}

export default Login;