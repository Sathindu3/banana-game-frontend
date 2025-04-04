import axios from "axios";

const API_URL = "http://localhost:5062/api/auth"; 

// Login function - handles session-based authentication
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    }, { withCredentials: true }); // Include credentials (cookies) in the request

    console.log("Login API Response:", response.data);
    return response.data; // This will return user data (not token, since session is managed via cookies)
  } catch (error) {
    console.error("Login API Error:", error);
    throw error.response ? error.response.data : "Login failed, please check your credentials.";
  }
};

// Register function - registers a new player
const register = async (playerData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, playerData); // Send playerData including email, password, and username
    return response.data; // Return registration result
  } catch (error) {
    throw error.response ? error.response.data : "Registration failed";
  }
};

// Logout function - clears the session by making a logout API call
const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); // Include credentials in the request
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

// Get the current user - returns user data based on the session (session managed by backend)
const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return response.data; // Returns the current user data if a session exists
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // Return null if no session or user exists.
  }
};

export default { login, register, logout, getCurrentUser };
