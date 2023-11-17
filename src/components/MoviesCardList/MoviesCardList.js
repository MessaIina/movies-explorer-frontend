import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
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

  const [isWideDesktop, setWideDesktop] = useState(window.innerWidth >= 1280);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1024);
  const [isWideTablet, setWideTablet] = useState(window.innerWidth >= 768);
  const [isTablet, setTablet] = useState(window.innerWidth >= 540);
  const [isMobile, setMobile] = useState(window.innerWidth < 540);

  const updateMedia = () => {
    setWideDesktop(window.innerWidth >= 1280);
    setDesktop(window.innerWidth > 1024);
    setWideTablet(window.innerWidth >= 768);
    setTablet(window.innerWidth >= 540);
    setMobile(window.innerWidth < 540);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const location = useLocation();
  const moviesRoute = location.pathname === "/movies";
  const savedMoviesRoute = location.pathname === "/saved-movies";
  const [loadingMovies, setLoadingMovies] = useState(0);
  const [stepLoadingMovies, setStepLoadingMovies] = useState(0);

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

  const handleShowMoreMovies = () => {
    setLoadingMovies(loadingMovies + stepLoadingMovies);
  };

  useEffect(() => {
    if (savedMoviesRoute) {
      handleResetFilteredSavedMovies(savedMovies);
    }
  }, []);

  if (moviesRoute) {
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
              className="show-more-btn "
              type="button"
              onClick={handleShowMoreMovies}
            >
              Ещё
            </button>
          )}
        </>
      );
    } else {
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