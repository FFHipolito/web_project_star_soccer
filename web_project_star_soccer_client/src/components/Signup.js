import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";
import { ErrorMessageContext } from "../contexts/ErrorMessageContext";

function Signup({ handleSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { handleAlertMessage } = useContext(ErrorMessageContext);
  const formRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setErrorMessage("Password is not the same!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }

    signup(name, email, phone, password)
      .then(() => {
        handleSignup();
        navigate("/");
      })
      .catch((error) => {
        const { name, message } = error;
        if (name === "ValidationError") {
          setErrorMessage(message);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        } else {
          handleAlertMessage({ type: "error", message });
        }
      });
  };

  return (
    <div className="signup">
      <h2 className="signup__welcome">Creater your account!</h2>
      {errorMessage && <span className="login__error">{errorMessage}</span>}
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
          minLength={10}
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
