import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ match, handleSubscription, hadleCloseMatch }) {
  const user = useContext(CurrentUserContext);
  const hasMatch = Object.keys(match).length > 0;
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

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
            {user.isSubscribed && (
              <span className="main__card_subscribed">
                {"You are subscribed!"}
              </span>
            )}
            <div className="main__card_container">
              <p className="main__card_date">{match.date}</p>
              <span className="main__card_time">🕗 {match.time}h</span>
            </div>
          </div>
          <button
            type="button"
            className="main__button"
            onClick={handleSubscription}
          >
            {user.isSubscribed ? "Unsubscribe" : "I gonna play!"}
          </button>
          {user.isAdmin && (
            <>
              <button
                type="button"
                className="main__button"
                onClick={hadleCloseMatch}
              >
                Close match
              </button>
              <Link to="/players">
                <button type="button" className="main__button">
                  See players
                </button>
              </Link>
            </>
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
