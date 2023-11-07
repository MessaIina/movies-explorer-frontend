import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = () => {
  return (
    <>
      <Header />
      <main>
        <section className="movies">
          <SearchForm />
          <FilterCheckbox />
          <MoviesCardList />
          <button className="movies__more btn" type="button">Ещё</button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Movies;