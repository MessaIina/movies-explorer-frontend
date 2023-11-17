import React, { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = ({
  handleGetMovies,
  handleCheckboxIsActive,
  handleSearchingMovieName,
  handleSaveMovie,
  handleDeleteMovie,
}) => {
  const { isLoading } = useContext(MainContext);

  return (
    <>
      <Header />
      <main className="main">
        <section className="movies">
          <SearchForm
            handleSearchingMovieName={handleSearchingMovieName}
            handleGetMovies={handleGetMovies}
            handleCheckboxIsActive={handleCheckboxIsActive}
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Movies;