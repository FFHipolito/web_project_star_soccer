function Main() {
  // TODO remove hardcode below after be integration
  const hasNextMatch = true;
  const isUserAdmin = false;
  const matchDate = "20/09/2024";
  const matchTime = "20:00";

  const title = hasNextMatch ? "Next Match" : "There is no match created yet.";
  return (
    <div className="main">
      <h2 className="main__title">{title}</h2>
      {!hasNextMatch && isUserAdmin && (
        <button type="button" className="main__button">
          Create a new match
        </button>
      )}
      {hasNextMatch && (
        <>
          <div className="main__card">
            <div className="main__card_container">
              <p className="main__card_date">{matchDate}</p>
              <span className="main__card_time">time: {matchTime}h</span>
            </div>
          </div>
          <button type="button" className="main__button">
            I gonna play!
          </button>
          {isUserAdmin && (
            <button type="button" className="main__button">
              See players
            </button>
          )}
        </>
      )}
      <button type="button" className="main__button">
        Edit my profile
      </button>
    </div>
  );
}

export default Main;
