import { Link } from "react-router-dom";
import { playerlistMock } from "../mock-data";

function PlayerList() {
  const playerList = playerlistMock();
  console.log(playerList);

  return (
    <div className="player__list">
      <h2 className="player__list_title">Player list</h2>
      <div className="player__list_container">
        <table className="player__list_table">
          <thead className="player__list_table_head">
            <tr>
              {playerList.length === 0 ? (
                <th>There is no player registered yet.</th>
              ) : (
                <>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="player__list_table_body">
            {playerList.map((el, index) => (
              <tr key={index}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link className="link" to="/">
        <p className="player__list_cancel">{"<-- go back"}</p>
      </Link>
    </div>
  );
}

export default PlayerList;
