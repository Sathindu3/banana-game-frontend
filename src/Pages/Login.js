import React, { useState } from "react";
import authService from "../Services/authService"; // Updated import

const TwoPlayerLogin = ({ setPlayer1, setPlayer2 }) => {
  const [player1, setPlayer1Local] = useState({ email: "", password: "" });
  const [player2, setPlayer2Local] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (player, setPlayer, setPlayerLocal) => {
    try {
      const data = await authService.login(player.email, player.password); // Using authService.login
      setPlayer(data.user);
      setPlayerLocal({ email: "", password: "" });
    } catch (error) {
      setError("Login failed! Check credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2>Two Player Login</h2>
      {error && <p className="error">{error}</p>}
      
      <div className="player-login">
        <h3>Player 1</h3>
        <input
          type="email"
          placeholder="Email"
          value={player1.email}
          onChange={(e) => setPlayer1Local({ ...player1, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={player1.password}
          onChange={(e) => setPlayer1Local({ ...player1, password: e.target.value })}
        />
        <button onClick={() => handleLogin(player1, setPlayer1, setPlayer1Local)}>
          Login as Player 1
        </button>
      </div>
      
      <div className="player-login">
        <h3>Player 2</h3>
        <input
          type="email"
          placeholder="Email"
          value={player2.email}
          onChange={(e) => setPlayer2Local({ ...player2, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={player2.password}
          onChange={(e) => setPlayer2Local({ ...player2, password: e.target.value })}
        />
        <button onClick={() => handleLogin(player2, setPlayer2, setPlayer2Local)}>
          Login as Player 2
        </button>
      </div>
    </div>
  );
};

export default TwoPlayerLogin;
