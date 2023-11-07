import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./SearchForm.css";

const SearchForm = () => {
  const { isValid, values, handleChange, errors } =
    useFormAndValidation();
  const { movie } = values;

  return (
    <div className="search-panel">
      <form className="search-panel__form" name="search-movie" noValidate>
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
  );
};

export default SearchForm;