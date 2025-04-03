import axios from "axios";

const API_URL = "http://localhost:5062/api/auth"; // Ensure backend URL is correct

const login = async (email, password) => {
  try {
    // Make API call to login endpoint
    const response = await axios.post('http://localhost:5062/api/auth/login', {
      email,
      password
    });

    // Log the response for debugging
    console.log("Login API Response:", response.data);

    // Assuming response contains a user object and a token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);  // Store token in localStorage
    }

    return response.data.user;  // Return the user object for player details
  } catch (error) {
    console.error("Login API Error:", error);

    // Throwing error with a more detailed message
    throw error.response ? error.response.data : "Login failed, please check your credentials.";
  }
};

const register = async (playerData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, playerData);  // Send playerData including email, password, and username
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Registration failed";
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return localStorage.getItem("token");  // Retrieve token from localStorage if logged in
};

export default { login, register, logout, getCurrentUser };
