import axios from "axios";

const API_URL = "http://localhost:5062/api/auth"; // Adjust this URL based on your backend

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    }
  } catch (error) {
    throw error.response ? error.response.data : "Login failed";
  }
};

const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
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
