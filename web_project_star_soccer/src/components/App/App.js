import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header";
import Login from "../Login";
import Signup from "../Signup";
import Footer from "../Footer";
import Main from "../Main";
import EditProfile from "../EditProfile";
import CreateMatch from "../CreateMatch";
import PlayerList from "../PlayerList";
import api from "../../utils/api";

const USER_INIT = {
  name: "",
  email: "",
  phone: "",
  isAdmin: false,
  isPlaying: false,
};

function App() {
  const loggedInInitialValue = localStorage.getItem("loggedIn") ? true : false;
  const [loggedIn, setLoggedIn] = useState(loggedInInitialValue);
  const [user, setUser] = useState(USER_INIT);
  const [match, setMatch] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser();
      getCurrentMatch();
    } else {
      handleLogout();
    }
  }, []);

  const getCurrentUser = () => {
    api
      .getUserInfo()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const getCurrentMatch = () => {
    api.getMatch().then((response) => {
      setMatch(response.data);
    });
  };

  const handleUpdateUser = (userData) => {
    api
      .updateUserInfo(userData)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleMatchSubscription = (isSubscribed) => {
    api
      .subscribeMatch(match.id, user.id, isSubscribed)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleCreateMatch = (matchData) => {
    api
      .createMatch(matchData)
      .then((response) => {
        setMatch(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const hadleCloseMatch = () => {
    api
      .deleteMatch(match.id)
      .then((response) => {
        setMatch({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    getCurrentUser();
    getCurrentMatch();
    setLoggedIn(true);
  };

  const handleSignup = (user) => {
    setUser(user);
    getCurrentMatch();
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(USER_INIT);
    setLoggedIn(false);
    setMatch({});
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("jwt");
  };

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentUserContext.Provider value={user}>
          <Header loggedIn={loggedIn} handleLogout={handleLogout} />
          <Routes>
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="*" element={<Login handleLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Signup handleSignup={handleSignup} />}
            />
            <Route
              path="/"
              element={
                <Main
                  match={match}
                  handleSubscription={handleMatchSubscription}
                  hadleCloseMatch={hadleCloseMatch}
                />
              }
            />
            <Route
              path="/edit-profile"
              element={<EditProfile handleUpdateUser={handleUpdateUser} />}
            />
            <Route
              path="/create-match"
              element={<CreateMatch handleCreateMatch={handleCreateMatch} />}
            />
            <Route
              path="/players"
              element={<PlayerList players={match.players} />}
            />
          </Routes>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
