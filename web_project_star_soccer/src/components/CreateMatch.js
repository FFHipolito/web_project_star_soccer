import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDateFormatted } from "../utils/format-date";

function CreateMatch({ handleCreateMatch }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateMin, setDateMin] = useState(getDateFormatted());

  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateMatch({
      date,
      time,
    });
    navigate("/");
  };

  return (
    <div className="create__match">
      <h2 className="create__match_welcome">Create a new match</h2>
      <form
        onSubmit={handleSubmit}
        className="create__match_form"
        ref={formRef}
      >
        <input
          id="matchDate"
          type="date"
          name="date"
          value={date}
          min={dateMin}
          onChange={(e) => setDate(e.target.value)}
          required
          className="create__match_input"
        />
        <input
          id="matchTime"
          type="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="create__match_input"
        />
        <div className="create__match_button-container">
          <button type="submit" className="create__match_button">
            Create
          </button>
        </div>
      </form>
      <Link className="link" to="/">
        <p className="create__match_cancel">{"<-- go back"}</p>
      </Link>
    </div>
  );
}

export default CreateMatch;
