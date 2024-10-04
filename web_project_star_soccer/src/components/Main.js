import { Link } from "react-router-dom";
import { userMock, matchMock } from "../mock-data";

function Main() {
  // TODO remove hardcode below after be integration
  const hasNextMatch = false;

  const title = hasNextMatch ? "Next Match" : "There is no match created yet.";
  return (
    <div className="main">
      <h2 className="main__title">{title}</h2>
      {!hasNextMatch && userMock.isAdmin && (
        <Link to="/create-match">
          <button type="button" className="main__button">
            Create a new match
          </button>
        </Link>
      )}
      {hasNextMatch && (
        <>
          <div className="main__card">
            <div className="main__card_container">
              <p className="main__card_date">{matchMock.date}</p>
              <span className="main__card_time">time: {matchMock.time}</span>
            </div>
          </div>
          <button type="button" className="main__button">
            I gonna play!
          </button>
          {userMock.isAdmin && (
            <button type="button" className="main__button">
              See players
            </button>
          )}
        </>
      )}
      <Link to="edit-profile">
        <button type="button" className="main__button">
          Edit my profile
        </button>
      </Link>
    </div>
  );
}

export default Main;
