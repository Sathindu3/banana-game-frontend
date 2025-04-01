import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Game from "./Components/Game";
import Login from "./Pages/Login";
// import Help from "./Help";
// import HighScore from "./HighScore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/help" element={<Help />} /> */}
        {/* <Route path="/highscore" element={<HighScore />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
