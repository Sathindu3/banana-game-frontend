import React, { useState } from "react";
import authService from "../Services/authService";
import "../Resources/Register.css";

const Register = ({ setPlayer1 }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const playerData = {
      email,
      username,  // Send username along with email and password
      password
    };

    try {
      const data = await authService.register(playerData); 
      setSuccessMessage("Registration successful! You can now log in.");
      setEmail("");
      setUsername(""); 
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      setError("Registration failed! Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      
      <button onClick={handleRegister}>Register</button>
      
      <div className="login-link">
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;
