import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import logo from "../images/logo-star-soccer-app.png";
import loginIcon from "../images/login-icon.png";

function Header({ loggedIn, handleLogout }) {
  const user = useContext(CurrentUserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const navText = loggedIn ? "Logout" : isLoginPage ? "Signup" : "Login";

  const handleNavigation = () => {
    if (loggedIn) {
      handleLogout();
      navigate("/login");
      return;
    }
    isLoginPage ? navigate("/signup") : navigate("/login");
  };

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Star Soccer App logo" />
      <div className="header__container">
        <button onClick={handleNavigation} className="header__button">
          {navText}
          <img
            className="header__icon"
            src={loginIcon}
            alt="Icon for login and logout"
          />
        </button>
        {user.name && <span className="header__user">Hello {user.name}!</span>}
      </div>
    </header>
  );
}

export default Header;
