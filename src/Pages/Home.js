import React from "react";
import { Link } from "react-router-dom";
import "../Resources/Home.css";
import myGif from "../Resources/monkey_animation2.gif";
import banana from "../Resources/banana.png";
import { useUser } from "../UserContext"; // Import the custom hook to use the UserContext
import authService from "../Services/authService";

const handleLogout = async (logout) => {
  try {
    // Log the user out
    await authService.logout();
    
    // Call the logout function from context
    logout();
    
    // Optionally, you can redirect them to the home page after logging out
    window.location.href = "/"; // Or use useHistory in React Router v5/v6
  } catch (error) {
    console.error("Error logging out", error);
  }
};

const Home = () => {
  const { user_Name, logout, loading } = useUser(); // Access the logged-in username and logout from context

  if (loading) {
    return <p>Loading...</p>; // Show "Loading..." until the user data is loaded
  }

  return (
    <div className="home-div" style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "60px", fontFamily: "cursive" }}>Hungry Monkies! 🍌</h1>
      <p style={{ fontWeight: "700", fontSize: "20px" }}>BEAT YOUR MONKEY FRIEND!</p>

      {/* Display logged-in username */}
      {user_Name ? (
        <p style={{ fontSize: "24px", fontWeight: "600" }}>Hi, {user_Name}!</p> // Show username if logged in
      ) : (
        <p style={{ fontSize: "24px", fontWeight: "600" }}>Please log in!</p> // Show prompt to log in if not logged in
      )}

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
        <li>
          <button onClick={() => handleLogout(logout)}>Logout</button>
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
