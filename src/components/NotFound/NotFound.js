import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Переход на предыдущую страницу в истории навигации
  };

  return (
    <main>
      <div className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <button className="not-found__link link" onClick={goBack}>
          Назад
        </button>
      </div>
    </main>
  );
};

export default NotFound;
