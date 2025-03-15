import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Banana Game! 🍌</h1>
      <p>Collect bananas and answer the quiz!</p>
      <Link to="/game">
        <button style={{ fontSize: "20px", padding: "10px" }}>Start Game</button>
      </Link>
    </div>
  );
};

export default Home;

