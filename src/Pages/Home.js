import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Resources/Home.css";
import myGif from "../Resources/monkey_animation2.gif";
import banana from "../Resources/banana.png";
import authService from "../Services/authService";
// import backgroundMusic from "../Resources/background.mp3";

// // Music
// useEffect(() => {
//   const bgMusic = new Audio(backgroundMusic);
//   bgMusic.loop = true;
//
//   const playMusic = () => {
//     bgMusic.play().catch((error) => console.error("Audio play failed:", error));
//     document.removeEventListener("click", playMusic);
//   };
//
//   document.addEventListener("click", playMusic);
//
//   return () => {
//     bgMusic.pause();
//     document.removeEventListener("click", playMusic);
//   };
// }, []);
const handleLogout = async () => {
  try {
    // Log the user out
    await authService.logout();
    
    // Optionally, you can redirect them to the home page after logging out
    window.location.href = "/"; // Or use useHistory in React Router v5/v6
  } catch (error) {
    console.error("Error logging out", error);
  }
};


const Home = () => {
  return (
    <div className="home-div" style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "60px", fontFamily: "cursive" }}>Hungry Monkies! 🍌</h1>
      <p style={{ fontWeight: "700", fontSize: "20px" }}>BEAT YOUR MONKEY FRIEND!</p>

      <div className="home-buttons" style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", marginTop: "20px" }}>
        {/* Game Mode Selection */}
        <Link to="/singleplayer">
          <button style={buttonStyle}>🐒 Single Player</button>
        </Link>
        <Link to="/game">
          <button style={buttonStyle}>👥 Multiplayer</button>
        </Link>

        {/* Other Pages */}
        <Link to="/register">
          <button style={buttonStyle}>👤 Login</button>
        </Link>
        <Link to="/help">
          <button style={buttonStyle}>❓ Help</button>
        </Link>
        {/* <Link to="/highscore">
          <button style={buttonStyle}>🏆 Highest Score</button>
        </Link> */}
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </div>

      <img style={{ width: "300px", position: "absolute", right: "0px" }} src={myGif} alt="GIF Animation" />
      <img className="banana_home" style={{ width: "300px", position: "absolute", right: "500px" }} src={banana} alt="Banana" />
      <img className="banana_home_1" style={{ width: "100px", position: "absolute", right: "1700px" }} src={banana} alt="Banana" />
      <img className="banana_home" style={{ width: "100px", position: "absolute", right: "200px", top: "250px" }} src={banana} alt="Banana" />
    </div>
  );
};

const buttonStyle = {
  fontSize: "20px",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#ffcc00",
  color: "#000",
  fontWeight: "bold",
  width: "200px",
  textAlign: "center",
};

export default Home;
