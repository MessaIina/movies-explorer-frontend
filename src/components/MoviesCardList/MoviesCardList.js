import React from "react";
import data from "../../utils/movies";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = () => {
  return data.length > 0 ? (
    <ul className="movies-list">
      {data.map(film => (
        <MoviesCard film={film} key={film.movieId} />
      ))}
    </ul>
  ) : (
    <p className="empty-list">Фильмы не найдены</p>
  );
};

export default MoviesCardList;