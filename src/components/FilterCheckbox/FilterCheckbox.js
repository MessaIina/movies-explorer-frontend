import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import "./FilterCheckbox.css";

const FilterCheckbox = ({
  handleCheckboxIsActive,
  handleSavedCheckboxIsActive,
}) => {
  const { checkboxIsActive, savedCheckboxIsActive } = useContext(MainContext);
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const location = useLocation();
  const savedMoviesRoute = location.pathname === "/saved-movies";
  const moviesRoute = location.pathname === "/movies";

  return (
    <form className="checkbox">
      {moviesRoute && (
        <label className="checkbox__label btn">
          {!isDesktop && "Короткометражки"}
          <input
            onClick={handleCheckboxIsActive}
            className="checkbox__input"
            type="checkbox"
            checked={checkboxIsActive}
            placeholder="Фильтр по короткометражкам"
          />
          <span
            className={
              checkboxIsActive
                ? "checkbox__switch checkbox__switch_active"
                : "checkbox__switch"
            }
          ></span>
          {isDesktop && "Короткометражки"}
        </label>
      )}

      {savedMoviesRoute && (
        <label className="checkbox__label btn">
          {!isDesktop && "Короткометражки"}
          <input
            onClick={() =>
              handleSavedCheckboxIsActive(!savedCheckboxIsActive)
            }
            className="checkbox__input"
            type="checkbox"
            checked={savedCheckboxIsActive}
            placeholder="Фильтр по короткометражкам"
          />
          <span
            className={
              savedCheckboxIsActive
                ? "checkbox__switch checkbox__switch_active"
                : "checkbox__switch"
            }
          ></span>
          {isDesktop && "Короткометражки"}
        </label>
      )}
    </form>
  );
};

export default FilterCheckbox;