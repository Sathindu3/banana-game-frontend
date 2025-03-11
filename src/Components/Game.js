import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

const Game = () => {
  const [player1, setPlayer1] = useState({ x: 50, y: 400, velocityY: 0, score: 0, isJumping: false });
  const [player2, setPlayer2] = useState({ x: 200, y: 400, velocityY: 0, score: 0, isJumping: false });
  const [bananas, setBananas] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [result, setResult] = useState(null);
  const gravity = 1;

  useEffect(() => {
    generatePlatforms();
    placeBananasOnPlatforms();
  }, []);

  const generatePlatforms = () => {
    const newPlatforms = [];
    for (let i = 0; i < 4; i++) {
      const platform = {
        x: Math.random() * 400,
        y: 500 - i * 100, // Staggered heights
        width: 120,
        height: 10,
      };
      newPlatforms.push(platform);
    }
    setPlatforms(newPlatforms);
  };

  const placeBananasOnPlatforms = () => {
    setBananas(
      platforms.map((platform) => ({
        x: platform.x + platform.width / 2,
        y: platform.y - 20, // Just above the platform
      }))
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer1((prev) => applyPhysics(prev));
      setPlayer2((prev) => applyPhysics(prev));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const applyPhysics = (player) => {
    let newY = player.y + player.velocityY;
    let newVelocityY = player.velocityY + gravity;

    platforms.forEach((platform) => {
      if (newY + 40 >= platform.y && newY + 40 <= platform.y + platform.height && player.x + 40 > platform.x && player.x < platform.x + platform.width) {
        newY = platform.y - 40;
        newVelocityY = 0;
      }
    });

    if (newY >= 500) {
      newY = 500;
      newVelocityY = 0;
    }

    return { ...player, y: newY, velocityY: newVelocityY, isJumping: newVelocityY !== 0 };
  };

  const handleKeyPress = (event) => {
    let newPlayer1 = { ...player1 };
    let newPlayer2 = { ...player2 };
    const speed = 20;
    const jumpForce = -15;

    switch (event.key) {
      case "a":
        newPlayer1.x -= speed;
        break;
      case "d":
        newPlayer1.x += speed;
        break;
      case "w":
        if (!player1.isJumping) newPlayer1.velocityY = jumpForce;
        break;
      case "ArrowLeft":
        newPlayer2.x -= speed;
        break;
      case "ArrowRight":
        newPlayer2.x += speed;
        break;
      case "ArrowUp":
        if (!player2.isJumping) newPlayer2.velocityY = jumpForce;
        break;
      default:
        break;
    }

    setPlayer1(newPlayer1);
    setPlayer2(newPlayer2);
    checkBananaCollision(newPlayer1, "player1");
    checkBananaCollision(newPlayer2, "player2");
  };

  const checkBananaCollision = (player, playerName) => {
    setBananas((prevBananas) =>
      prevBananas.filter((banana) => {
        const isColliding =
          Math.abs(player.x - banana.x) < 30 &&
          Math.abs(player.y - banana.y) < 30;
        if (isColliding) {
          if (playerName === "player1") setPlayer1((p) => ({ ...p, score: p.score + 1 }));
          if (playerName === "player2") setPlayer2((p) => ({ ...p, score: p.score + 1 }));
        }
        return !isColliding;
      })
    );
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [player1, player2]);

  return (
    <div className="game-container">
      <div className="game-info">
        <p>🐵 Player 1 Score: {player1.score} | 🐵 Player 2 Score: {player2.score}</p>
      </div>
      <div className="game-area">
        {platforms.map((platform, index) => (
          <div key={index} className="platform" style={{ left: platform.x, top: platform.y }} />
        ))}
        <img src="/assets/monkey1.png" className="player" style={{ left: player1.x, top: player1.y }} alt="Player 1" />
        <img src="/assets/monkey2.png" className="player" style={{ left: player2.x, top: player2.y }} alt="Player 2" />
        {bananas.map((banana, index) => (
          <img key={index} src="/assets/banana.png" className="banana" style={{ left: banana.x, top: banana.y }} alt="Banana" />
        ))}
      </div>
    </div>
  );
};

export default Game;
