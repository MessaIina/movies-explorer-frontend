import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import { useAdaptiveRender } from "../../hooks/useAdaptiveRender";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = ({
  handleSaveMovie,
  handleDeleteSavedMovie,
  handleDeleteMovie,
  handleResetFilteredSavedMovies,
}) => {
  const { savedMovies, filteredMovies, filteredSavedMovies, errorMessage } =
    useContext(MainContext);
  const { isWideDesktop, isDesktop, isTablet, isMobile } = useAdaptiveRender();

  const location = useLocation();
  // Роут всех фильмов и роут сохранённых фильмов для условного рендера элементов
  const moviesRoute = location.pathname === "/movies";
  const savedMoviesRoute = location.pathname === "/saved-movies";

  // Фильмы, которые нужно подгружать в зависимости от ширины экрана
  const [loadingMovies, setLoadingMovies] = useState(0);
  // Шаг, с которым кнопка "Ещё" подгружает фильмы в зависимоти от ширины экрана
  const [stepLoadingMovies, setStepLoadingMovies] = useState(0);
  // 1 колонка. slice(0, 5). Шаг 2 фильма. Если остаётся меньше 2 фильмов, скрывать кнопку "Ещё"
  // 2 колонки. slice(0, 8). Шаг 2 фильма. Если остаётся меньше 2 фильмов, скрывать кнопку "Ещё"
  // 3 колонки. slice(0, 12). Шаг 3 фильма. Если остаётся меньше 3 фильмов, скрывать кнопку "Ещё"
  // 4 колонки. slice(0, 16). Шаг 4 фильма. Если остаётся меньше 4 фильмов, скрывать кнопку "Ещё"

  // Сброс подгруженных карт при новом поиске
  useEffect(() => {
    if (isMobile) {
      setLoadingMovies(5);
    }
    if (isTablet && !isDesktop) {
      setLoadingMovies(8);
    }
    if (isDesktop && !isWideDesktop) {
      setLoadingMovies(12);
    }
    if (isWideDesktop) {
      setLoadingMovies(16);
    }
  }, [filteredMovies]);

  // Смена шага подгрузки и конца массива фильмов в зависимости от ширины экрана
  useEffect(() => {
    if (isMobile) {
      setLoadingMovies(5);
      setStepLoadingMovies(2);
    }
    if (isTablet && !isDesktop) {
      setLoadingMovies(8);
      setStepLoadingMovies(2);
    }
    if (isDesktop && !isWideDesktop) {
      setLoadingMovies(12);
      setStepLoadingMovies(3);
    }
    if (isWideDesktop) {
      setLoadingMovies(16);
      setStepLoadingMovies(4);
    }
  }, [isWideDesktop, isDesktop, isTablet, isMobile]);

  const handleLoadMoreMovies = () => {
    setLoadingMovies(loadingMovies + stepLoadingMovies);
  };

  useEffect(() => {
    if (savedMoviesRoute) {
      handleResetFilteredSavedMovies(savedMovies);
    }
  }, []);

  if (moviesRoute) {
    // Если в сторе есть сохранённые фильмы, то рендерить их или пустую заглушку
    if (JSON.parse(localStorage.getItem("filteredMovies")).length > 0) {
      return (
        <>
          <ul className="movies-list">
            {filteredMovies.slice(0, loadingMovies).map(movie => (
              <MoviesCard
                movie={movie}
                key={movie.id}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
            ))}
          </ul>
          {loadingMovies < filteredMovies.length && (
            <button
              className="load-more-btn "
              type="button"
              onClick={handleLoadMoreMovies}
            >
              Ещё
            </button>
          )}
        </>
      );
    } else {
      // Если при получении фильмов появилось сообщение об ошибке, выводить текст ошибки (красный) на экран.
      // Если ошибки нет, но и фильмы не получены, выводить сообщение о "пустом" списке фильмов.
      return (
        <p
          className={`${
            errorMessage ? "empty-list empty-list_type_error" : "empty-list"
          }`}
        >
          {errorMessage ? errorMessage : "Ничего не найдено"}
        </p>
      );
    }
  }

  if (savedMoviesRoute) {
    if (filteredSavedMovies.length > 0) {
      return (
        <ul className="movies-list">
          {filteredSavedMovies.map(movie => (
            <MoviesCard
              movie={movie}
              key={movie.movieId}
              handleDeleteSavedMovie={handleDeleteSavedMovie}
            />
          ))}
        </ul>
      );
    } else {
      // Если при получении фильмов появилось сообщение об ошибке, выводить текст ошибки (красный) на экран.
      // Если ошибки нет, но и фильмы не получены, выводить сообщение о "пустом" списке фильмов.
      return (
        <p
          className={`${
            errorMessage ? "empty-list empty-list_type_error" : "empty-list"
          }`}
        >
          {errorMessage ? errorMessage : "Ничего не найдено"}
        </p>
      );
    }
  }
};

export default MoviesCardList;