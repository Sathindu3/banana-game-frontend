import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Import UserContext to use login function
import authService from "../Services/authService"; // Ensure you have the auth service to handle login

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser(); // Get the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErrors(""); // Clear errors on each login attempt

    try {
      const data = await authService.login(email, password); // Call the authService to login

      // Store the username in the UserContext
      login(data.username);

      // Navigate to the home page after successful login
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setErrors(error?.response?.data?.message || "Login failed! Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errors && <p className="error">{errors}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
