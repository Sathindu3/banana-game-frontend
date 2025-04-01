import React from "react";
import { Link } from "react-router-dom";
import "../Resources/Home.css";

const Home = () => {
  return (
    <div className="home-div" style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Banana Game! 🍌</h1>
      <p>Collect bananas, answer quizzes, and have fun!</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", marginTop: "20px" }}>
        <Link to="/login">
          <button style={buttonStyle}>🎮 Play</button>
        </Link>
        <Link to="/help">
          <button style={buttonStyle}>❓ Help</button>
        </Link>
        <Link to="/highscore">
          <button style={buttonStyle}>🏆 Highest Score</button>
        </Link>
      </div>
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
