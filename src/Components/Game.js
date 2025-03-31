import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

const Game = () => {
  const [player1, setPlayer1] = useState({
    x: 100,
    y: 500,
    velocityY: 0,
    score: 0,
    isJumping: false
  });
  const [player2, setPlayer2] = useState({ x: 300, y: 500, velocityY: 0, score: 0, isJumping: false });
  const [chests, setChests] = useState([]);
  const [bananas, setBananas] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [timer, setTimer] = useState(60);
  const [answer, setAnswer] = useState("");  // To store the player's answer
  const [feedback, setFeedback] = useState("");  // Feedback message: "Correct!" or "Try again!"
  const gravity = 1;

  const platforms = [
    { x: 100, y: 450, width: 550, height: 10 },
    { x: 200, y: 350, width: 150, height: 10 },
    { x: 300, y: 250, width: 150, height: 10 },
    { x: 400, y: 150, width: 150, height: 10 },
    { x: 100, y: 550, width: 550, height: 10 },
  ];

  useEffect(() => {
    placeChests();
    placeBananas();
  }, []);

  const placeChests = () => {
    setChests([{ x: 200, y: 350 }, { x: 300, y: 250 }, { x: 400, y: 150 }]);
  };

  const placeBananas = () => {
    setBananas([{ x: 150, y: 450 }, { x: 250, y: 350 }, { x: 350, y: 250 }]);
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

    return { ...player, y: newY, velocityY: newVelocityY, isJumping: !isOnPlatform };
  };

  const handleKeyPress = (event) => {
    if (["a", "d", "w"].includes(event.key)) {
      setPlayer1((prev) => movePlayer(prev, event.key, setPlayer1));
    } else if (["ArrowLeft", "ArrowRight", "ArrowUp"].includes(event.key)) {
      setPlayer2((prev) => movePlayer(prev, event.key, setPlayer2));
    }
  };

  const movePlayer = (player, key, setPlayer) => {
    let newPlayer = { ...player };
    const speed = 10;
    const jumpForce = -15;

    switch (key) {
      case "a":
      case "ArrowLeft":
        newPlayer.x -= speed;
        break;
      case "d":
      case "ArrowRight":
        newPlayer.x += speed;
        break;
      case "w":
      case "ArrowUp":
        if (!player.isJumping) newPlayer.velocityY = jumpForce;
        break;
      default:
        break;
    }

    checkChestCollision(newPlayer);
    return newPlayer;
  };

  const checkChestCollision = (player) => {
    setChests((prevChests) =>
      prevChests.filter((chest) => {
        const isColliding = Math.abs(player.x - chest.x) < 30 && Math.abs(player.y - chest.y) < 30;
        if (isColliding) {
          fetchQuiz();
        }
        return !isColliding;
      })
    );
  };

  const fetchQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:5062/api/Game/quiz");
      setQuiz(response.data.data);
      setShowQuiz(true);
      setFeedback("");  // Reset feedback when a new quiz is fetched
    } catch (error) {
      console.error("Error fetching quiz", error);
    }
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const verifyAnswer = () => {
    if (answer === quiz.solution.toString()) {
      setFeedback("Correct!");
      setPlayer1((prev) => ({ ...prev, score: prev.score + 10 })); // Add score if correct
      setShowQuiz(false); // Hide quiz after answering correctly
    } else {
      setFeedback("Try again!");
      setAnswer(""); // Reset the input for a retry
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
        {chests.map((chest, index) => (
          <img key={index} src="/assets/chest.png" className="chest" style={{ left: chest.x, top: chest.y }} alt="Chest" />
        ))}
        {bananas.map((banana, index) => (
          <img key={index} src="/assets/banana.png" className="banana" style={{ left: banana.x, top: banana.y }} alt="Banana" />
        ))}
      </div>
      {showQuiz && quiz && (
        <div className="quiz-container">
          <img src={quiz.question} alt="Quiz" />
          <input
            type="number"
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Enter your answer"
          />
          <button onClick={verifyAnswer}>Submit</button>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
