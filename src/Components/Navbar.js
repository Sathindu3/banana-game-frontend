import React from "react";
import { Link } from "react-router-dom";
import authService from "../Services/authService";

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    try {
      await authService.logout(); // Log the user out
      window.location.href = "/login"; // Redirect to login or home page after logout
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game">Multiplayer Game</Link>
        </li>
        <li>
          <Link to="/singleplayer">Single Player Game</Link>
        </li>
        {/* Show login button if no user is logged in */}
        {!user ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          // Show logout button if the user is logged in
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
