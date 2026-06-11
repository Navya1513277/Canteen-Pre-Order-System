import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async () => {

  try {

    await axios.post(
      "http://localhost:5000/register",
      {
        name,
        email,
        password
      }
    );

    // REDIRECT TO LOGIN
    navigate("/login");

  } catch (error) {

    if (error.response) {

      alert(error.response.data.message);

    } else {

      alert("Server Error");

    }

  }

};

  return (

      <div className="register-container">

      <div className="register-card">
        <h2 className="text-center mb-4">
          User Registration
        </h2>

        <input
          type="text"
          placeholder="Enter Name"
          className="form-control mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="form-control mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="form-control mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
  className="btn btn-success w-100"
  onClick={registerUser}
>
  Register
</button>

<p className="text-center mt-3">
  Already Registered?
  <a href="/login"> Login Here</a>
</p>

      </div>

    </div>

  );

}

export default Register;