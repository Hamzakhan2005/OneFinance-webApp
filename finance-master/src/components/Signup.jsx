import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5555";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/oneFinance/signup", formData);
      console.log("User signed up successfully:", response.data);
      // Redirect to home page after successful sign-up
      navigate("/");
    } catch (error) {
      console.error("Error signing up user:", error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div className="signup-page">
      <div className="left-side"></div>
      <div className="right-side">
        <div className="signin-option">
          <a href="/">
            <Link to="/login">Already have an account ? Log in</Link>
          </a>
        </div>
        <div className="signup-card">
          <h1>Sign Up</h1>
          <div className="signup-details">
            <form onSubmit={handleSubmit}>
              <label>
                <h3>Username</h3>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter full name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <h3>Phone Number</h3>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Enter your phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <h3>Email</h3>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email (if you have any)"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                <h3>Password</h3>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
