import React from "react";
import "./BurgerMenu.css";

function BurgerMenu({ onSetSideBarIsActive }) {
  const moviesOrProfileRoute = !(
    window.location.href.includes("profile") ||
    window.location.href.includes("movies")
  );
  return (
    <nav className="burger">
      <button
        type="button"
        className={`burger__btn btn${
          moviesOrProfileRoute ? " burger__btn_light" : ""
        }`}
        onClick={onSetSideBarIsActive}
      >
        <span
          className={`burger__line${
            moviesOrProfileRoute ? " burger__line_light" : ""
          }`}
        ></span>
      </button>
    </nav>
  );
}

export default BurgerMenu;