import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authorize } from "../utils/auth";
import { ErrorMessageContext } from "../contexts/ErrorMessageContext";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { handleAlertMessage } = useContext(ErrorMessageContext);
  const token = localStorage.getItem("jwt");
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize(email, password)
      .then(() => {
        handleLogin();
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
    <div className="login">
      <h2 className="login__welcome">Welcome back!</h2>
      {errorMessage && <span className="login__error">{errorMessage}</span>}
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
      <p className="signup__message">
        Don't have an account yet?{" "}
        <Link className="link" to="/signup">
          Sign up here!
        </Link>
      </p>
    </div>
  );
}

export default Login;
