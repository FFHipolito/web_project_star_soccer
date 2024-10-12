import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfile({ handleUpdateUser }) {
  const user = useContext(CurrentUserContext);
  const formRef = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) return;
    handleUpdateUser({ name, email, phone, password });
    navigate("/");
  };

  const validateForm = () => {
    if (
      name === user.name &&
      email === user.email &&
      phone === user.phone &&
      password === "" &&
      passwordConfirmation === ""
    ) {
      setErrorMessage("Nothing was changed!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return false;
    }
    if (password !== passwordConfirmation) {
      setErrorMessage("Password confirmation is not the same!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return false;
    }
    return true;
  };

  return (
    <div className="edit__profile">
      <h2 className="edit__profile_welcome">Edit Profile</h2>
      {errorMessage && (
        <span className="edit__profile_error">{errorMessage}</span>
      )}
      <form
        onSubmit={handleSubmit}
        className="edit__profile_form"
        ref={formRef}
      >
        <input
          type="name"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="edit__profile_input"
        />
        <input
          type="email"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          className="edit__profile_input"
        />
        <input
          type="text"
          value={phone}
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (99) 9999-9999"
          required
          className="edit__profile_input"
        />
        <input
          type="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength={6}
          className="edit__profile_input"
        />
        <input
          type="password"
          value={passwordConfirmation}
          id="password-confirmation"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm new password"
          minLength={6}
          className="edit__profile_input"
        />
        <div className="edit__profile_button-container">
          <button type="submit" className="edit__profile_button">
            Confirm changes
          </button>
        </div>
      </form>
      <Link className="link" to="/">
        <p className="edit__profile_cancel">{"<-- go back"}</p>
      </Link>
    </div>
  );
}

export default EditProfile;
