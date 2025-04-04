import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext"; 
import "./Navbar.css";

const Navbar = () => {
  const { user_Name } = useUser(); 

  return (
    <nav>
      <ul className="navbar-main">
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
            <span>Hi, {user_Name}!</span>
          ) : (
            <Link to="/login">Login</Link> 
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
