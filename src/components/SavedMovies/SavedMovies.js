import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "../Movies/Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

const SavedMovies = () => {
  return (
    <>
      <Header />
      <main>
        <section className="movies">
          <SearchForm />
          <FilterCheckbox />
          <MoviesCardList />
          <div className="movies__more-placeholder"></div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;