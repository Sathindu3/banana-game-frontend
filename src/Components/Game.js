import React, { useState, useEffect } from "react";
import axios from "axios";

const Game = () => {
    const [player1, setPlayer1] = useState({ x: 100, y: 300 });
    const [player2, setPlayer2] = useState({ x: 400, y: 300 });
    const [bananas, setBananas] = useState([{ x: 200, y: 250 }]);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [timer, setTimer] = useState(60);
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            axios.get("http://localhost:5000/api/game/quiz").then((res) => {
                setQuiz(res.data);
            });
        }
    }, [timer]);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") setPlayer2((p) => ({ ...p, x: p.x + 10 }));
        if (e.key === "ArrowLeft") setPlayer2((p) => ({ ...p, x: p.x - 10 }));
        if (e.key === "d") setPlayer1((p) => ({ ...p, x: p.x + 10 }));
        if (e.key === "a") setPlayer1((p) => ({ ...p, x: p.x - 10 }));

        bananas.forEach((banana, index) => {
            if (Math.abs(player1.x - banana.x) < 20) {
                setScore((s) => ({ ...s, player1: s.player1 + 10 }));
                setBananas([]);
            }
            if (Math.abs(player2.x - banana.x) < 20) {
                setScore((s) => ({ ...s, player2: s.player2 + 10 }));
                setBananas([]);
            }
        });
    };

    return (
        <div tabIndex="0" onKeyDown={handleKeyDown} style={{ textAlign: "center" }}>
            <h1>Banana Game</h1>
            <p>Time: {timer}</p>
            <p>Player 1 Score: {score.player1}</p>
            <p>Player 2 Score: {score.player2}</p>
            {quiz ? <div><h3>{quiz.Question}</h3></div> : <p>Collect Bananas!</p>}
        </div>
    );
};

export default Game;
