import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import "./MoviesCard.css";

const MoviesCard = ({
  movie,
  handleSaveMovie,
  handleDeleteMovie,
  handleDeleteSavedMovie,
}) => {
  const { savedMovies } = useContext(MainContext);
  const isMobile = window.matchMedia("(min-width: 540px)").matches;
  const location = useLocation();
  const savedMoviesRoute = location.pathname === "/saved-movies";
  const moviesRoute = location.pathname === "/movies";

  const convertDuration = duration =>
    (Math.floor(duration / 60) && Math.floor(duration / 60) + "ч ") +
    (duration % 60) +
    "м";

  const isLiked = savedMovies.some(i => i.movieId === movie.id);

  return (
    <li className="movie" key={movie.id}>
      <Link className="btn" to={movie.trailerLink} target="_blank">
        <img
          className="movie__thumbnail"
          src={
            moviesRoute
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={`Постер фильма ${movie.nameRU}`}
        />
      </Link>
      <div className="movie__container">
        <h2 className="movie__name">{movie.nameRU}</h2>
        {moviesRoute && (
          <button
            onClick={
              isLiked
                ? () => handleDeleteMovie(movie.id)
                : () => handleSaveMovie(movie)
            }
            className={
              isLiked
                ? "movie__like movie__like_active btn"
                : "movie__like btn"
            }
            type="button"
            aria-label="Лайк\дизлайк"
          />
        )}
        {savedMoviesRoute && (
          <button
            onClick={() => handleDeleteSavedMovie(movie._id)}
            className={
              isMobile
                ? "movie__delete movie__delete_active btn"
                : "movie__delete btn"
            }
            type="button"
            aria-label="Лайк\дизлайк"
          />
        )}
      </div>
      <p className="movie__duration">{convertDuration(movie.duration)}</p>
    </li>
  );
};

export default MoviesCard;