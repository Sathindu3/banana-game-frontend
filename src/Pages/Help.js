import React from "react";
import keys from "../Resources/keys.jpg";
import "../Resources/Help.css";

const Help = () => {
  return (
    <div className="help-container">
      <div className="sub-help">
        <h2>Help & Support</h2>

        <section>
          <h3>1. How to create an account?</h3>
          <p>To Create an account, go to the <a href="/register">Sign Up</a> page, enter your email and password, and click the "Register" button. Once registered, you can log in.</p>
        </section>

        <section>
          <h3>2. How to Log In?</h3>
          <p>On the <a href="/login">Login</a> page, enter your email and password and click the "Login" button. You need to log in before to start a game.</p>
        </section>

        <section>
          <h3>3. Controls</h3>
          <p>User "W","A","D" for control player in single player. <br></br>
            In multiplayer, User "W","A","D" for control player 1 and use Arrow keys to control player 2 </p>
          <img src={keys} style={{ width: "500px" }}></img>
        </section>
        <section>
          <h3>4. Rules</h3>
          <p>There is a time of 60 seconds. Player/Players need to score within that time. Highest score will be the winner</p>
          <p>Point for collecting banana : 20 points</p>
          <p>Point for solving puzzle : 50 points</p>
        </section>
      </div>
    </div>
  );
};

export default Help;
