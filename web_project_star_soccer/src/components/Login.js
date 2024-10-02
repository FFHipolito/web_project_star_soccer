import React, { useState, useRef } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="login">
      <h2 className="login__welcome">Login</h2>
      <form onSubmit={handleSubmit} className="login__form" ref={formRef}>
        <input
          type="email"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          className="login__input"
        />
        <input
          type="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength={6}
          required
          className="login__input"
        />
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
