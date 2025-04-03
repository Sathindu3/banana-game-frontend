import axios from "axios";

const API_URL = "http://localhost:5062/api/auth"; // Ensure backend URL is correct

const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5062/api/auth/login", 
      { email, password },  // <-- Ensure email & password are inside an object
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error.response?.data);
    throw error.response?.data?.message || "Login failed!";
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
