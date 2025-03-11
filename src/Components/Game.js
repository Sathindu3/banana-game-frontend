import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

const Game = () => {
  const [player1, setPlayer1] = useState({ x: 50, y: 300, score: 0 });
  const [player2, setPlayer2] = useState({ x: 200, y: 300, score: 0 });
  const [bananas, setBananas] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    generateBananas();
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      axios
        .get("https://marcconrad.com/uob/banana/api.php")
        .then((res) => {
          setQuiz(res.data);
          setShowQuiz(true);
        })
        .catch((err) => console.error("Error fetching quiz:", err));
    }
  }, [timeLeft]);

  const generateBananas = () => {
    const newBananas = [];
    for (let i = 0; i < 5; i++) {
      newBananas.push({
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 300) + 50,
      });
    }
    setBananas(newBananas);
  };

  const handleKeyPress = (event) => {
    const speed = 10;
    let newPlayer1 = { ...player1 };
    let newPlayer2 = { ...player2 };

    switch (event.key) {
      case "w":
        newPlayer1.y -= speed;
        break;
      case "s":
        newPlayer1.y += speed;
        break;
      case "a":
        newPlayer1.x -= speed;
        break;
      case "d":
        newPlayer1.x += speed;
        break;
      case "ArrowUp":
        newPlayer2.y -= speed;
        break;
      case "ArrowDown":
        newPlayer2.y += speed;
        break;
      case "ArrowLeft":
        newPlayer2.x -= speed;
        break;
      case "ArrowRight":
        newPlayer2.x += speed;
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
    const newBananas = bananas.filter((banana) => {
      const isColliding =
        Math.abs(player.x - banana.x) < 30 &&
        Math.abs(player.y - banana.y) < 30;
      if (isColliding) {
        if (playerName === "player1")
          setPlayer1((p) => ({ ...p, score: p.score + 1 }));
        if (playerName === "player2")
          setPlayer2((p) => ({ ...p, score: p.score + 1 }));
      }
      return !isColliding;
    });

    setBananas(newBananas);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [player1, player2, bananas]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!quiz || !quiz.answer) {
      setResult("No quiz data available.");
      return;
    }

    if (
      userAnswer.trim() &&
      quiz.answer.toLowerCase() === userAnswer.trim().toLowerCase()
    ) {
      setResult("✅ Correct!");
    } else {
      setResult("❌ Incorrect. The correct answer was: " + quiz.answer);
    }
  };

  return (
    <div className="game-container">
      <div className="game-info">
        <p>Time Left: {timeLeft}s</p>
        <p>
          🐵 Player 1 Score: {player1.score} | 🐵 Player 2 Score:{" "}
          {player2.score}
        </p>
      </div>
      <div className="game-area">
        <img src="/assets/bg-1.jpg" className="background" alt="background" />
        <img
          src="/assets/monkey1.png"
          className="player"
          style={{ left: player1.x, top: player1.y }}
          alt="Player 1"
        />
        <img
          src="/assets/monkey2.png"
          className="player"
          style={{ left: player2.x, top: player2.y }}
          alt="Player 2"
        />
        {bananas.map((banana, index) => (
          <img
            key={index}
            src="/assets/banana.png"
            className="banana"
            style={{ left: banana.x, top: banana.y }}
            alt="Banana"
          />
        ))}
      </div>

      {showQuiz && quiz && (
        <div className="quiz-popup">
          <h2>Quiz Time! 🧠</h2>
          <img src={quiz.question} alt="Quiz" className="quiz-image" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              required
            />
            <button type="submit">Submit</button>
          </form>
          {result && <p className="quiz-result">{result}</p>}
        </div>
      )}
    </div>
  );
};

export default Game;
