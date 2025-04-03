import React from "react";

const Help = () => {
  return (
    <div className="help-container">
      <h2>Help & Support</h2>
      
      <section>
        <h3>How to Register?</h3>
        <p>To register, go to the <a href="/register">Sign Up</a> page, enter your email and password, and click the "Register" button. Once registered, you can log in.</p>
      </section>

      <section>
        <h3>How to Log In?</h3>
        <p>On the <a href="/login">Login</a> page, enter your email and password and click the "Login" button. You need to log in as both Player 1 and Player 2 to start a game.</p>
      </section>

      <section>
        <h3>How to Play the Two-Player Game?</h3>
        <p>Both players must log in using their accounts. Once both are authenticated, they will be taken to the game screen where Player 1 and Player 2 can play together.</p>
      </section>

      <section>
        <h3>Forgot Password?</h3>
        <p>If you forgot your password, please contact support or check if the application has a password reset feature.</p>
      </section>

      <section>
        <h3>Need More Help?</h3>
        <p>If you need further assistance, contact our support team at <strong>support@example.com</strong>.</p>
      </section>
    </div>
  );
};

export default Help;
