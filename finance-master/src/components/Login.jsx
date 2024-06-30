import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5555";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/oneFinance/login", {
        username: username,
        password,
      });
      console.log("User logged in successfully:", response.data);
      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Error logging in user:", error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div className="login-page">
      <div className="left"></div>
      <div className="right">
        <div className="card">
          <div className="login-details">
            <div className="heading">
              <h1>Login</h1>
            </div>
            <div className="fields">
              <form onSubmit={handleSubmit}>
                <label>
                  <h3>username </h3>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </label>
                <label>
                  <h3>Password</h3>
                  <div className="password-field">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                    >
                      <img
                        src={
                          showPass
                            ? require("./utils/hide.png")
                            : require("./utils/visibility.png")
                        }
                        alt=""
                      />
                    </button>
                  </div>
                  <div className="options">
                    <a href="/signup">
                      <p>Don't have an account? Sign Up</p>
                    </a>
                    <a href="/forgot">
                      <p>Forgot password ?</p>
                    </a>
                  </div>
                </label>
                <button className="login-btn" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
