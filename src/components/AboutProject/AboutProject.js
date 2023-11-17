import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="about-project">
      <h1 className="title">О проекте</h1>
      <ul className="about-project__runtime">
        <li className="about-project__runtime-item">
          <h2 className="about-project__runtime-title">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__runtime-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__runtime-item">
          <h2 className="about-project__runtime-title">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__runtime-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <article className="about-project__runtime-scheme">
        <h3 className="about-project__runtime-scheme-item">1 неделя</h3>
        <h3 className="about-project__runtime-scheme-item">4 недели</h3>
        <div className="about-project__runtime-scheme-item">Back-end</div>
        <div className="about-project__runtime-scheme-item">Front-end</div>
      </article>
    </section>
  );
};

export default AboutProject;