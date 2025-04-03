import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";
import backgroundMusic from "../Resources/background.mp3";
import jumpSound from "../Resources/jump.mp3";
import collectSound from "../Resources/collect.mp3";

const SinglePlayerGame = () => {
  const [player, setPlayer] = useState({
    x: 100,
    y: 500,
    velocityY: 0,
    score: 0,
    isJumping: false,
  });
  const [chests, setChests] = useState([]);
  const [bananas, setBananas] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [timer, setTimer] = useState(60); // Game timer (if needed for a single-player timer)
  const [answer, setAnswer] = useState("");  // To store the player's answer
  const [feedback, setFeedback] = useState("");  // Feedback message: "Correct!" or "Try again!"
  const gravity = 1;

  const platforms = [
    { x: 100, y: 450, width: 150, height: 10 },
    { x: 200, y: 350, width: 150, height: 10 },
    { x: 300, y: 250, width: 150, height: 10 },
    { x: 400, y: 150, width: 150, height: 10 },
    { x: 100, y: 550, width: 150, height: 10 },
    { x: 500, y: 450, width: 150, height: 10 },
    { x: 800, y: 350, width: 150, height: 10 },
    { x: 600, y: 250, width: 150, height: 10 },
    { x: 750, y: 150, width: 150, height: 10 },
    { x: 900, y: 550, width: 150, height: 10 },
  ];

  useEffect(() => {
    placeChests();
    placeBananas();
  }, []);

  const placeChests = () => {
    setChests([{ x: 200, y: 350 }, { x: 300, y: 250 }, { x: 400, y: 150 }]);
  };

  const placeBananas = () => {
    setBananas([{ x: 150, y: 400 }, { x: 250, y: 300 }, { x: 350, y: 200 }]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer((prev) => applyPhysics(prev));
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
      setPlayer((prev) => movePlayer(prev, event.key));
      new Audio(jumpSound).play();
    }
  };

  const movePlayer = (player, key) => {
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
      setPlayer((prev) => ({ ...prev, score: prev.score + 10 })); // Add score if correct
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

  // collect banana
  useEffect(() => {
    const checkBananaCollection = (player) => {
      setBananas((prevBananas) => {
        return prevBananas.map((banana) => {
          if (!banana.collected && Math.abs(player.x - banana.x) < 30 && Math.abs(player.y - banana.y) < 30) {
            new Audio(collectSound).play();
            setPlayer((prev) => ({ ...prev, score: prev.score + 10 })); // Increase score
            return { ...banana, collected: true }; // Mark banana as collected
          }
          return banana;
        });
      });
    };
  
    checkBananaCollection(player); // Ensure this is only called when `player` changes
  }, [player]);  // Now `useEffect` is dependent on player, so it only triggers when `player` changes.
  

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer((prev) => applyPhysics(prev));  // Ensure only state updates when necessary
    }, 30);
    return () => clearInterval(interval);
  }, []);  // This useEffect only runs once, so it doesn't get caught in a loop.

  return (
    <div className="game-container">
      <div className="game-info">
        <p>🐵 Score: {player.score}</p>
      </div>
      <div className="game-area">
        {platforms.map((platform, index) => (
          <div key={index} className="platform" style={{ left: platform.x, top: platform.y }} />
        ))}
        <img src="/assets/monkey1.png" className="player" style={{ left: player.x, top: player.y }} alt="Player" />
        {chests.map((chest, index) => (
          <img key={index} src="/assets/chest.png" className="chest" style={{ left: chest.x, top: chest.y }} alt="Chest" />
        ))}
        {bananas
          .filter((banana) => !banana.collected)
          .map((banana, index) => (
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

export default SinglePlayerGame;
