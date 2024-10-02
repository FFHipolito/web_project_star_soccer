import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Login from "../Login";

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

  return (
    <div className="page">
      <Header />
      <Login handleLogin={handleLogin} />
      <Footer />
    </div>
  );
}

export default App;
