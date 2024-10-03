import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, authorize } from "../utils/auth";

function Signup({ handleLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      console.log("ERROR: Password is different");
      return;
    }
    signup(name, email, phone, password)
      .then(() => {
        authorize(email, password);
        handleLogin(email);
        navigate("/");
      })
      .catch((error) => {
        console.error("signup error:", error);
      });
  };

  return (
    <div className="signup">
      <h2 className="signup__welcome">Creater your account!</h2>
      <form onSubmit={handleSubmit} className="signup__form" ref={formRef}>
        <input
          type="name"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="signup__input"
        />
        <input
          type="email"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          className="signup__input"
        />
        <input
          type="text"
          value={phone}
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (99) 9999-9999"
          required
          className="signup__input"
        />
        <input
          type="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength={6}
          required
          className="signup__input"
        />
        <input
          type="password"
          value={passwordConfirmation}
          id="password-confirmation"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Password Confirmation"
          minLength={6}
          required
          className="signup__input"
        />
        <div className="signup__button-container">
          <button type="submit" className="signup__button">
            Sign Up
          </button>
        </div>
      </form>
      <p className="login__message">
        Do you already have an account?{" "}
        <Link className="link" to="/login">
          Login here!
        </Link>
      </p>
    </div>
  );
}

export default Signup;
