import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Game from "./Components/Game";
import SinglePlayerGame from "./Components/SinglePlayerGame";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Help from "./Pages/Help";
import Home from "./Pages/Home";
import authService from "../src/Services/authService"; // Import the auth service

function App() {
  const [user, setUser] = useState(null); // Track logged-in user

  // Check login status when the app mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser); // Set the user if logged in, or null if not
    };
    checkLoginStatus(); // Call this on initial load
  }, []);

  return (
    <Router>
      <Navbar user={user} /> {/* Pass user data to Navbar for conditional rendering */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/singleplayer" element={<SinglePlayerGame />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
