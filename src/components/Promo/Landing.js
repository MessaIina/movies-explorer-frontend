import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {

  return (
    <section className="landing">
      <div className="landing__container">
        <div className="landing__image"></div>
        <div className="landing__info">
          <h1 className="landing__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="landing__below-info">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
      </div>
      <Link
        to="https://github.com/MessaIina/movies-explorer-frontend"
        target="_blank"
        className="landing__more btn"
      >
        Узнать больше
      </Link>
    </section>
  );
};

export default Landing;