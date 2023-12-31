import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import Logo from "../../images/logo.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Navigation from "../Navigation/Navigation";
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.css";

const Header = () => {
  const { loggedIn } = useContext(MainContext);
  const [sidebarIsActive, setSideBarIsActive] = useState(true);
  const location = useLocation();
  const moviesOrProfileRoute =
    location.pathname === "/profile" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/movies";

  useEffect(() => {
    setSideBarIsActive(false);
  }, []);

  const handleSetSideBarIsActive = () => {
    setSideBarIsActive(!sidebarIsActive);
  };

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  return (
    <header className={`header${!moviesOrProfileRoute  ? " header_dark" : ""}`}>
      <Link className="header__logo-link link" to={"/"}>
        <img src={Logo} alt="Логотип сайта" className="header__logo" />
      </Link>
      {loggedIn ? (
        <>
          {isDesktop ? (
            <>
              <Navigation />
              <div className="header__profile-btn">
                <ProfileBtn />
              </div>
            </>
          ) : (
            <>
              <Sidebar
                sidebarIsActive={sidebarIsActive}
                onSetSideBarIsActive={handleSetSideBarIsActive}
              />
              <BurgerMenu onSetSideBarIsActive={handleSetSideBarIsActive} />
            </>
          )}
        </>
      ) : (
        <nav className="header__auth-links">
          <Link to="/signup" className="header__signup link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__signin link">
            Войти
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;