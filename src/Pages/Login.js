import React, { useState } from "react";
import authService from "../Services/authService";
import "../Resources/Login.css";

const TwoPlayerLogin = ({ setPlayer1, setPlayer2 }) => {
  const [players, setPlayers] = useState({
    player1: { email: "", password: "" },
    player2: { email: "", password: "" },
  });

  const [errors, setErrors] = useState({ player1: "", player2: "" });
  const [loading, setLoading] = useState({ player1: false, player2: false });

  // Handle input changes for both players
  const handleChange = (event, player) => {
    const { name, value } = event.target;
    setPlayers((prev) => ({
      ...prev,
      [player]: { ...prev[player], [name]: value },
    }));
  };

  // Handle login process for each player
  const handleLogin = async (playerKey, setPlayer) => {
    setLoading((prev) => ({ ...prev, [playerKey]: true }));
    setErrors((prev) => ({ ...prev, [playerKey]: "" }));

    try {
      // Make the API call to log the player in
      const data = await authService.login(players[playerKey].email, players[playerKey].password);

      // Assuming the response contains the username and player ID
      const playerData = {
        username: data?.username || "Unknown",  // Ensure username is correctly accessed
        email: players[playerKey].email,
        id: data?.id || null, // Adding player ID
        token: localStorage.getItem("token"),  // Fetching token from localStorage
      };

      // Set the player data using the passed in setPlayer function
      setPlayer(playerData);

      // Clear the input fields after successful login
      setPlayers((prev) => ({
        ...prev,
        [playerKey]: { email: "", password: "" },
      }));

      // Optionally handle after both players log in and proceed to game
      if (playerKey === "player2") {
        // Redirect to game page or other actions after both players log in
        window.location.href = "/game"; // Example redirection
      }

    } catch (error) {
      // Handle errors and display the error message
      setErrors((prev) => ({
        ...prev,
        [playerKey]: error?.response?.data?.message || "Login failed! Check credentials.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [playerKey]: false }));
    }
  };

  return (
    <div className="login-main flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Two Player Login</h2>

      <div className="login-main-form grid grid-cols-1 md:grid-cols-2 gap-6">
        {["player1", "player2"].map((playerKey, index) => (
          <div
            key={playerKey}
            className="bg-white p-6 rounded-2xl shadow-lg w-80 transition transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-center mb-4">{`Player ${index + 1}`}</h3>

            {/* Error message for the respective player */}
            {errors[playerKey] && (
              <p className="text-red-500 text-sm text-center mb-2">{errors[playerKey]}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={players[playerKey].email}
              onChange={(e) => handleChange(e, playerKey)}
              className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={players[playerKey].password}
              onChange={(e) => handleChange(e, playerKey)}
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => handleLogin(playerKey, playerKey === "player1" ? setPlayer1 : setPlayer2)}
              disabled={loading[playerKey]}
              className={`w-full py-2 rounded-lg text-white font-bold transition ${loading[playerKey]
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading[playerKey] ? "Logging in..." : `Login as Player ${index + 1}`}
            </button>
          </div>
        ))}z
      </div>

      {/* Display character images */}
      <div className="character">
        <img src={"/assets/monkey1.png"} className="player-one" alt="Player 1" />
        <img src={"/assets/monkey2.png"} className="player-two" alt="Player 2" />
      </div>
    </div>
  );
};

export default TwoPlayerLogin;
