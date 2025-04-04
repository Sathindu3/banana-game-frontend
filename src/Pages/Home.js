import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Resources/Home.css";
import myGif from "../Resources/monkey_animation2.gif";
import banana from "../Resources/banana.png";
import { useUser } from "../UserContext";
import authService from "../Services/authService";


const handleLogout = async (logout) => {
  try {
    await authService.logout(); 
    logout(); 
    window.location.href = "/"; 
  } catch (error) {
    console.error("Error logging out", error);
  }
};

const Home = () => {
  const { user_Name, logout, loading } = useUser(); // Access the logged-in username and loading state from context
  const navigate = useNavigate();


  if (loading) {
    return <p>Loading...</p>; 
  }


  const handleGameModeClick = (mode) => {
    if (!user_Name) {
      alert("You must be logged in to play Single Player or Multiplayer!"); 
      navigate("/register");
    } else {
     
      if (mode === "singleplayer") {
        navigate("/singleplayer");
      } else if (mode === "multiplayer") {
        navigate("/game");
      }
    }
  };

  return (
    <div className="home-div" style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "60px", fontFamily: "cursive" }}>Hungry Monkies! 🍌</h1>
      <p style={{ fontWeight: "700", fontSize: "20px" }}>BEAT YOUR MONKEY FRIEND!</p>

      {/* Display logged-in username */}
      {user_Name ? (
        <p style={{ fontSize: "24px", fontWeight: "600" }}>Hi, {user_Name}!</p> 
      ) : (
        <p style={{ fontSize: "24px", fontWeight: "600" }}>Please log in!</p> 
      )}

      {/* Display "Please log in to play" message if not logged in */}
      {!user_Name && !loading && (
        <p style={{ fontSize: "18px", color: "red" }}>Please log in to play single player or multiplayer!</p>
      )}

      <div
        className="home-buttons"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* Game Mode Selection */}
        <button
          style={buttonStyle}
          onClick={() => handleGameModeClick("singleplayer")} // Handle single player click
          disabled={loading || !user_Name} // Disable button if loading or not logged in
        >
          🐒 Single Player
        </button>

        <button
          style={buttonStyle}
          onClick={() => handleGameModeClick("multiplayer")} // Handle multiplayer click
          disabled={loading || !user_Name} // Disable button if loading or not logged in
        >
          👥 Multiplayer
        </button>

        {/* Other Pages */}
        <Link to="/register">
          <button style={buttonStyle}>👤 Login</button>
        </Link>
        <Link to="/help">
          <button style={buttonStyle}>❓ Help</button>
        </Link>
        <li className="logout-button">
          <button onClick={() => handleLogout(logout)}>Logout</button>
        </li>
      </div>

      {/* Displaying images */}
      <img
        style={{ width: "300px", position: "absolute", right: "0px" }}
        src={myGif}
        alt="GIF Animation"
      />
      <img
        className="banana_home"
        style={{ width: "300px", position: "absolute", right: "500px" }}
        src={banana}
        alt="Banana"
      />
      <img
        className="banana_home_1"
        style={{ width: "100px", position: "absolute", right: "1700px" }}
        src={banana}
        alt="Banana"
      />
      <img
        className="banana_home"
        style={{ width: "100px", position: "absolute", right: "200px", top: "250px" }}
        src={banana}
        alt="Banana"
      />
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
