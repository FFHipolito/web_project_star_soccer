import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Footer from "../Footer";
import Header from "../Header";
import Login from "../Login";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "" });
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

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Routes>
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="*" element={<Login handleLogin={handleLogin} />} />
          </Routes>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
