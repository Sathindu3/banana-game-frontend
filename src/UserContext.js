import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../src/Services/authService"; // Import authService

// Create context
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Create UserContextProvider
export const UserProvider = ({ children }) => {
  const [user_Name, setUser_Name] = useState(""); // Store the username
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch the current user when the app loads
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser(); // Fetch current session
        if (currentUser && currentUser.username) {
          setUser_Name(currentUser.username); // Set the username if session exists
        }
      } catch (error) {
        console.error("Error loading user session", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchCurrentUser(); // Call the fetch function on initial load
  }, []);

  const login = (username) => {
    setUser_Name(username);
    localStorage.setItem("user_Name", username); // Save username to localStorage
  };

  const logout = () => {
    setUser_Name("");
    localStorage.removeItem("user_Name"); // Remove username from localStorage
  };

  return (
    <UserContext.Provider value={{ user_Name, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
