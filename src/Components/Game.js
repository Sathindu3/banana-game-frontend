import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

const Game = () => {
  const [player1, setPlayer1] = useState({ x: 50, y: 500, velocityY: 0, score: 0, isJumping: false });
  const [player2, setPlayer2] = useState({ x: 200, y: 500, velocityY: 0, score: 0, isJumping: false });
  const [bananas, setBananas] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [timer, setTimer] = useState(30);
  const gravity = 1;

  // Platforms
  const platforms = [
    { x: 100, y: 450, width: 150, height: 10 },
    { x: 250, y: 350, width: 150, height: 10 },
    { x: 400, y: 250, width: 150, height: 10 },
    { x: 550, y: 150, width: 150, height: 10 },
  ];

  useEffect(() => {
    placeBananasOnPlatforms();
  }, []);

  const placeBananasOnPlatforms = () => {
    setBananas(
      platforms.map((platform) => ({
        x: platform.x + platform.width / 2 - 15,
        y: platform.y - 30,
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
    let isOnPlatform = false;

    platforms.forEach((platform) => {
      if (
        newY + 40 >= platform.y &&
        player.y + 40 <= platform.y &&
        player.x + 40 > platform.x &&
        player.x < platform.x + platform.width
      ) {
        newY = platform.y - 40;
        newVelocityY = 0;
        isOnPlatform = true;
      }
    });

    if (newY >= 500) {
      newY = 500;
      newVelocityY = 0;
      isOnPlatform = true;
    }

    return { ...player, y: newY, velocityY: newVelocityY, isJumping: !isOnPlatform };
  };

  const handleKeyPress = (event) => {
    setPlayer1((prev) => {
      if (["a", "d", "w"].includes(event.key)) {
        return movePlayer(prev, event.key, "player1");
      }
      return prev;
    });
  
    setPlayer2((prev) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp"].includes(event.key)) {
        return movePlayer(prev, event.key, "player2");
      }
      return prev;
    });
  };
  

  const movePlayer = (player, key, playerName) => {
    let newPlayer = { ...player };
    const speed = 10;
    const jumpForce = -15;

    switch (key) {
      case "a":
        newPlayer.x -= speed;
        break;
      case "d":
        newPlayer.x += speed;
        break;
      case "w":
        if (!player.isJumping) newPlayer.velocityY = jumpForce;
        break;
      case "ArrowLeft":
        newPlayer.x -= speed;
        break;
      case "ArrowRight":
        newPlayer.x += speed;
        break;
      case "ArrowUp":
        if (!player.isJumping) newPlayer.velocityY = jumpForce;
        break;
      default:
        break;
    }
    checkBananaCollision(newPlayer, playerName);
    return newPlayer;
  };

  const checkBananaCollision = (player, playerName) => {
    setBananas((prevBananas) =>
      prevBananas.filter((banana) => {
        const isColliding =
          Math.abs(player.x - banana.x) < 30 && Math.abs(player.y - banana.y) < 30;
        if (isColliding) {
          if (playerName === "player1") setPlayer1((p) => ({ ...p, score: p.score + 10 }));
          if (playerName === "player2") setPlayer2((p) => ({ ...p, score: p.score + 10 }));
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
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          fetchQuiz();
          setShowQuiz(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get("https://marcconrad.com/uob/banana/api.php");
      setQuiz(response.data);
    } catch (error) {
      console.error("Error fetching quiz", error);
    }
  };

  return (
    <div className="game-container">
      <div className="game-info">
        <p>⏳ Time Left: {timer}s</p>
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
      {showQuiz && quiz && (
        <div className="quiz-container">
          <h3>{quiz.question}</h3>
        </div>
      )}
    </div>
  );
};

export default Game;
