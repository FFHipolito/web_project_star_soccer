import { useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo-star-soccer-app.png";
import loginIcon from "../images/login-icon.png";

function Header({ loggedIn, userEmail, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

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
      <button onClick={handleNavigation} className="header__button">
        {navText}
        <img
          className="header__icon"
          src={loginIcon}
          alt="Icon for login and logout"
        />
      </button>
    </header>
  );
}

export default Header;
