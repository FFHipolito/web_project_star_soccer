import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userMock } from "../mock-data";

function EditProfile() {
  const [hasChange, setHasChange] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: userMock.name,
    email: userMock.email,
    phone: userMock.phone,
    newPass: "",
    newPassConfirm: "",
  });

  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("form sent");
    // add edit request
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

    setHasChange(() => {
      if (name === "newPass" || name === "newPassConfirm") return value !== "";
      return userMock[name] !== value.trimEnd();
    });
  };

  return (
    <div className="edit__profile">
      <h2 className="edit__profile_welcome">Edit Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="edit__profile_form"
        ref={formRef}
      >
        <input
          id="name"
          type="name"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="edit__profile_input"
        />
        <input
          id="email"
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          placeholder="E-mail"
          required
          className="edit__profile_input"
        />
        <input
          id="phone"
          type="text"
          name="phone"
          value={userDetails.phone}
          onChange={handleChange}
          placeholder="Phone (99) 9999-9999"
          required
          className="edit__profile_input"
        />
        <input
          id="password"
          type="password"
          name="newPass"
          value={userDetails.newPass}
          onChange={handleChange}
          placeholder="New password"
          minLength={6}
          className="edit__profile_input"
        />
        <input
          id="password-confirmation"
          type="password"
          name="newPassConfirm"
          value={userDetails.newPassConfirm}
          onChange={handleChange}
          placeholder="Confirm new password"
          minLength={6}
          className="edit__profile_input"
        />
        <div className="edit__profile_button-container">
          <button
            type="submit"
            className={`edit__profile_button ${!hasChange && "disabled"}`}
            disabled={!hasChange}
          >
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
