import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <main>
      <div className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <Link to="/" className="not-found__link link">
          Назад
        </Link>
      </div>
    </main>
  );
};

export default NotFound;