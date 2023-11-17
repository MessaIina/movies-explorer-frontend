import React, { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "../Movies/Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

const SavedMovies = ({
  handleSearchingMovieName,
  handleSearchingSavedMovieName,
  handleDeleteSavedMovie,
  handleSavedCheckboxIsActive,
  handleResetFilteredSavedMovies,
}) => {
  const { isLoading } = useContext(MainContext);

  return (
    <>
      <Header />
      <main className="main">
        <section className="movies">
          <SearchForm
            handleSearchingMovieName={handleSearchingMovieName}
            handleSearchingSavedMovieName={handleSearchingSavedMovieName}
            handleSavedCheckboxIsActive={handleSavedCheckboxIsActive}
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              handleDeleteSavedMovie={handleDeleteSavedMovie}
              handleResetFilteredSavedMovies={handleResetFilteredSavedMovies}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;