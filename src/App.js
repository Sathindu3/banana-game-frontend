import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Game from "./Components/Game"; // Multiplayer game
import SinglePlayerGame from "./Components/SinglePlayerGame"; // Single Player game
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Help from "./Pages/Help";
// import HighScore from "./HighScore";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Game Mode Selection */}
        <Route path="/game" element={<Game />} />  {/* Multiplayer Game */}
        
        {/* New Route for SinglePlayer Game */}
        <Route path="/singleplayer" element={<SinglePlayerGame />} />  {/* SinglePlayer Game */}
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Help Page */}
        <Route path="/help" element={<Help />} />
        
        {/* Uncomment if you have a HighScore page */}
        {/* <Route path="/highscore" element={<HighScore />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
