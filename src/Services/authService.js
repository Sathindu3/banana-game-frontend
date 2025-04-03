import axios from "axios";

const API_URL = "http://localhost:5062/api/auth"; // Ensure backend URL is correct

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,   // Send email and password in the request body
      password
    });
    return response.data;  // Assuming response has a user object
  } catch (error) {
    throw error.response ? error.response.data : "Login failed";
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
  return localStorage.getItem("token");
};

export default { login, register, logout, getCurrentUser };
