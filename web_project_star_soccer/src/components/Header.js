import logo from "../images/logo-star-soccer-app.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Star Soccer App logo" />
    </header>
  );
}

export default Header;
