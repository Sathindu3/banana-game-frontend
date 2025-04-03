import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext"; // Import the custom hook to use the UserContext

const Navbar = () => {
  const { user_Name } = useUser(); // Get user_Name from UserContext

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/singleplayer">Single Player</Link>
        </li>
        <li>
          <Link to="/game">Multiplayer</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          {user_Name ? (
            <span>Hi, {user_Name}!</span> // Display username if logged in
          ) : (
            <Link to="/login">Login</Link> // Link to login page if not logged in
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
