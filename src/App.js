import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Game from "./Components/Game";
import SinglePlayerGame from "./Components/SinglePlayerGame";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Help from "./Pages/Help";
import Home from "./Pages/Home";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/singleplayer" element={<SinglePlayerGame />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
