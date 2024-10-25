import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ErrorMessageContext } from "../../contexts/ErrorMessageContext";
import { checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute";
import Header from "../Header";
import Login from "../Login";
import Signup from "../Signup";
import Footer from "../Footer";
import Main from "../Main";
import AlertMessage from "../AlertMessage";
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
  const [alertMessage, setAlertMessage] = useState({});

  const getCurrentUser = useCallback(() => {
    api
      .getUserInfo()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        handleLogout();
        const { message } = error;
        handleAlertMessage({ type: "error", message });
      });
  }, []);

  const getCurrentMatch = useCallback(() => {
    api
      .getMatch()
      .then((response) => {
        setMatch(response.data);
      })
      .catch((error) => {
        handleLogout();
        const { message } = error;
        handleAlertMessage({ type: "error", message });
      });
  }, []);

  const handleUpdateUser = (userData) => {
    api
      .updateUserInfo(userData)
      .then((response) => {
        setUser(response.data);
        const { message } = response;
        handleAlertMessage({ type: "success", message });
      })
      .catch((error) => {
        const { message } = error;
        handleAlertMessage({ type: "error", message });
      });
  };

  const handleMatchSubscription = () => {
    api
      .subscribeMatch(match, user)
      .then((response) => {
        setUser(response.data.user);
        setMatch(response.data.match);
        const { message } = response;
        handleAlertMessage({ type: "success", message });
      })
      .catch((error) => {
        const { message } = error;
        handleAlertMessage({ type: "error", message });
      });
  };

  const handleCreateMatch = (matchData) => {
    api
      .createMatch(matchData)
      .then((response) => {
        setMatch(response.data);
        const { message } = response;
        handleAlertMessage({ type: "success", message });
      })
      .catch((error) => {
        const { message } = error;
        handleAlertMessage({ type: "error", message });
      });
  };

  const hadleCloseMatch = () => {
    api
      .deleteMatch(match.id)
      .then((response) => {
        setMatch({});
        const { message } = response;
        handleAlertMessage({ type: "success", message });
      })
      .catch((error) => {
        const { message } = error;
        handleAlertMessage({ type: "error", message });
      });
  };

  const handleLogin = () => {
    getCurrentUser();
    getCurrentMatch();
    setLoggedIn(true);
  };

  const handleSignup = () => {
    getCurrentUser();
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

  const handleAlertMessage = ({ type, message }) => {
    setAlertMessage({ type, message });
    setTimeout(() => {
      setAlertMessage({});
    }, 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((response) => {
          setUser(response.data);
          setLoggedIn(true);
        })
        .catch((error) => {
          const { message } = error;
          handleAlertMessage({ type: "error", message });
          handleLogout();
        });

      getCurrentMatch();
    } else {
      handleLogout();
    }
  }, [getCurrentUser, getCurrentMatch]);

  return (
    <BrowserRouter>
      <div className="page">
        {alertMessage && <AlertMessage alertMessage={alertMessage} />}
        <ErrorMessageContext.Provider
          value={{ alertMessage, handleAlertMessage }}
        >
          <CurrentUserContext.Provider value={user}>
            <Header loggedIn={loggedIn} handleLogout={handleLogout} />
            <Routes>
              <Route
                path="/login"
                element={<Login handleLogin={handleLogin} />}
              />
              <Route
                path="/signup"
                element={<Signup handleSignup={handleSignup} />}
              />

              {/* Routes for users logged in */}
              <Route
                path="/"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Main
                      match={match}
                      handleSubscription={handleMatchSubscription}
                      hadleCloseMatch={hadleCloseMatch}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <EditProfile handleUpdateUser={handleUpdateUser} />
                  </ProtectedRoute>
                }
              />

              {/* Routes only for admin users */}
              <Route
                path="/create-match"
                element={
                  <ProtectedRoute loggedIn={loggedIn} requireAdmin={true}>
                    <CreateMatch handleCreateMatch={handleCreateMatch} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/players"
                element={
                  <ProtectedRoute loggedIn={loggedIn} requireAdmin={true}>
                    <PlayerList players={match.players} />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Login handleLogin={handleLogin} />} />
            </Routes>
            <Footer />
          </CurrentUserContext.Provider>
        </ErrorMessageContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
