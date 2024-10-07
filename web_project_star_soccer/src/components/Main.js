import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ match, handleSubscription }) {
  const user = useContext(CurrentUserContext);
  const hasMatch = Object.keys(match).length > 0;

  const subscribeToMatch = (e) => {
    e.preventDefault();
    handleSubscription();
  };

  const title = hasMatch ? "Next Match" : "There is no match created yet.";
  return (
    <div className="main">
      <h2 className="main__title">{title}</h2>
      {!hasMatch && user.isAdmin && (
        <Link to="/create-match">
          <button type="button" className="main__button">
            Create a new match
          </button>
        </Link>
      )}
      {hasMatch && (
        <>
          <div className="main__card">
            <div className="main__card_container">
              <p className="main__card_date">{match.date}</p>
              <span className="main__card_time">time: {match.time}h</span>
            </div>
          </div>
          {user.isPlaying ? (
            <button
              type="button"
              className="main__button"
              onClick={subscribeToMatch}
            >
              Unsubscribe
            </button>
          ) : (
            <button
              type="button"
              className="main__button"
              onClick={subscribeToMatch}
            >
              I gonna play!
            </button>
          )}
          {user.isAdmin && (
            <Link to="/players">
              <button type="button" className="main__button">
                See players
              </button>
            </Link>
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
