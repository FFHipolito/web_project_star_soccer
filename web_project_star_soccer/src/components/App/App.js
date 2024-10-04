import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "../Header";
import Login from "../Login";
import Signup from "../Signup";
import Footer from "../Footer";
import Main from "../Main";
import EditProfile from "../EditProfile";
import CreateMatch from "../CreateMatch";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") ? true : false
  );

  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("jwt");
  };

  return (
    <BrowserRouter>
      <div className="page">
        {/* <CurrentUserContext.Provider value={currentUser}> */}
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Signup handleLogin={handleLogin} />}
          />
          <Route path="/" element={<Main />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-match" element={<CreateMatch />} />
        </Routes>
        <Footer />
        {/* </CurrentUserContext.Provider> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
