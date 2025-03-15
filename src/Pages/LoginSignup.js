import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState({ player1: "", player2: "" });
  const [passwords, setPasswords] = useState({ player1: "", player2: "" });
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async (player, authType) => {
    const endpoint = authType === "login" ? "login" : "signup";
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        username: players[player],
        password: passwords[player],
      });

      if (response.data.playerId) {
        localStorage.setItem(player, JSON.stringify(response.data));

        // Check if both players are logged in
        if (localStorage.getItem("player1") && localStorage.getItem("player2")) {
          navigate("/game");
        }
      }
    } catch (error) {
      console.error(`${authType} failed`, error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{isSignup ? "Sign Up" : "Login"} - Player 1 & Player 2</h2>

      {/* Player 1 */}
      <div>
        <h3>Player 1</h3>
        <input type="text" placeholder="Username" onChange={(e) => setPlayers({ ...players, player1: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setPasswords({ ...passwords, player1: e.target.value })} />
        <button onClick={() => handleAuth("player1", isSignup ? "signup" : "login")}>{isSignup ? "Sign Up" : "Login"}</button>
      </div>

      {/* Player 2 */}
      <div>
        <h3>Player 2</h3>
        <input type="text" placeholder="Username" onChange={(e) => setPlayers({ ...players, player2: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setPasswords({ ...passwords, player2: e.target.value })} />
        <button onClick={() => handleAuth("player2", isSignup ? "signup" : "login")}>{isSignup ? "Sign Up" : "Login"}</button>
      </div>

      <button onClick={() => setIsSignup(!isSignup)} style={{ marginTop: "20px" }}>
        {isSignup ? "Switch to Login" : "Switch to Signup"}
      </button>
    </div>
  );
};

export default LoginSignup;
