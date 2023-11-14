import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({
  handleSearchingMovieName,
  handleSearchingSavedMovieName,
  handleGetMovies,
  handleCheckboxIsActive,
  handleSavedCheckboxIsActive,
}) => {
  const { isValid, values, handleChange, errors, setValues } =
    useFormAndValidation();
  const { movie } = values;

  const location = useLocation();
  // const savedMoviesRoute = location.pathname === "/saved-movies";
  const moviesRoute = location.pathname === "/movies";

  useEffect(() => {
    if (moviesRoute) {
      setValues({
        movie: localStorage.getItem("searchingMovieName"),
      });
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) {
      return;
    } else {
      handleGetMovies();
      handleSearchingMovieName(movie);
    }
  };
  const handleSavedSubmit = e => {
    e.preventDefault();
    if (!isValid) {
      return;
    } else {
      handleSearchingSavedMovieName(movie);
    }
  };

  return (
    <>
      <div className="search-panel">
        <form
          className="search-panel__form"
          name="search-movie"
          noValidate
          onSubmit={moviesRoute ? handleSubmit : handleSavedSubmit}
        >
          <input
            className="search-panel__input"
            id="search-movie-input"
            type="text"
            name="movie"
            maxLength="40"
            placeholder="Фильм"
            value={movie || ""}
            onChange={handleChange}
            required
          />
          <button
            className="search-panel__search-btn btn"
            type="submit"
            aria-label="Поиск фильма"
            disabled={!isValid}
          >
            Найти
          </button>
        </form>
        <span
          className={`${
            !isValid && "search-movie-input_active"
          } search-movie-input-error`}
        >
          {errors.movie}
        </span>
      </div>
      <FilterCheckbox
        handleCheckboxIsActive={handleCheckboxIsActive}
        handleSavedCheckboxIsActive={handleSavedCheckboxIsActive}
      />
    </>
  );
};

export default SearchForm;