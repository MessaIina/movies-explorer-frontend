import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h1 className="portfolio__title">Портфолио</h1>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link
            target="_blank"
            to="https://github.com/MessaIina/how-to-learn"
            className="portfolio__link link"
          >
            Статичный сайт
            <div className="portfolio__link-arrow"></div>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link
            target="_blank"
            to="https://github.com/MessaIina/russian-travel"
            className="portfolio__link link"
          >
            Адаптивный сайт
            <div className="portfolio__link-arrow"></div>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link
            target="_blank"
            to="https://github.com/MessaIina/react-mesto-api-full-gha"
            className="portfolio__link link"
          >
            Одностраничное приложение
            <div className="portfolio__link-arrow"></div>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;