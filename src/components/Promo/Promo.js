import React from "react";
import { Link } from "react-router-dom";
import "./Promo.css";

const Promo = () => {

  return (
    <section className="Promo">
      <div className="Promo__container">
        <div className="Promo__info">
          <h1 className="Promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="Promo__below-info">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <div className="Promo__image"></div>
      </div>    
      <Link
        to="https://github.com/MessaIina/movies-explorer-frontend"
        target="_blank"
        className="Promo__more btn"
      >
        Узнать больше
      </Link>
    </section>
  );
};

export default Promo;
