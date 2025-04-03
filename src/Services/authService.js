import axios from "axios";

const API_URL = "http://localhost:5062/api/auth"; // Ensure backend URL is correct

// Login function - handles session-based authentication
const login = async (email, password) => {
  try {
    // Make API call to login endpoint
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    }, { withCredentials: true }); // Include credentials (cookies) in the request

    // Log the response for debugging
    console.log("Login API Response:", response.data);

    // The backend will handle the session management, no need to store token
    return response.data;  // Return the user object for player details
  } catch (error) {
    console.error("Login API Error:", error);

    // Throwing error with a more detailed message
    throw error.response ? error.response.data : "Login failed, please check your credentials.";
  }
};

// Register function
const register = async (playerData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, playerData);  // Send playerData including email, password, and username
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Registration failed";
  }
};

// Logout function - clears the session by making a logout API call
const logout = async () => {
  try {
    // Make a call to the backend to destroy the session
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });  // Include credentials in the request
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

// Get the current user - returns user data based on the session
const getCurrentUser = () => {
  // Since session data is handled server-side, the front-end doesn't need to track it
  // The backend will manage the session and include user info in responses
  return null;  // No need to retrieve token from localStorage
};

export default { login, register, logout, getCurrentUser };
