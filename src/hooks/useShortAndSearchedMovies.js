import { useMemo } from "react";

export const useShortMovies = (movies, checkboxIsActive) => {
  const shortMovies = useMemo(() => {
    if (checkboxIsActive) {
      return [...movies].filter(movie => movie.duration <= 40);
    }
    return movies;
  }, [movies, checkboxIsActive]);
  return shortMovies;
};

export const useShortAndSearchedMovies = (
  movies,
  checkboxIsActive,
  searchStr
) => {
  const shortMovies = useShortMovies(movies, checkboxIsActive);
  const shortAndSearchedMovies = useMemo(() => {
    return shortMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchStr);
    });
  }, [searchStr, shortMovies]);
  return shortAndSearchedMovies;
};