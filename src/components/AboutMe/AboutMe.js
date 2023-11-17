import React from "react";
import "./AboutMe.css";
import { Link } from "react-router-dom";
import myPhoto from "../../images/photo.bmp";

const AboutMe = () => {

  return (
    <section className="about-me">
      <h1 className="title">Студент</h1>
      <div className="about-me__container">
        <div className="about-me__description">
          <h2 className="about-me__name">Надежда</h2>
          <p className="about-me__info">Фронтенд-разработчик, 35 лет</p>
          <p className="about-me__bio">
          Я родилась и долгое время жила в маленьком поселке Зеленогорский. В 25 лет переехала в город Кемерово, где долгое время работала звукорежиссером в Колледже культуры и искусств, параллельно участвовала в культурной жизни города,
           работая на одной сцене как с местными артистами, так и со звездами отечественного шоу-бизнеса. Но решила не стоять на месте и пойти развиваться дальше. 
           Мой выбор пал на IT-технологии, и подруга посоветовала пойти в Яндекс.Практикум, так как сама его закончила и сейчас работает удаленно. 
           А еще у меня есть любимый кот, его Зовут Оливер Сайкс, в честь вокалиста одной из моих любимых групп.
          </p>
          <Link
            className="about-me__github-link link"
            target="_blank"
            to="https://github.com/MessaIina"
          >
            Github
          </Link>
        </div>
        <img 
            className="about-me__photo" 
            src={myPhoto} 
            alt="Моя фотокарточка" />
      </div>
    </section>
  );
};

export default AboutMe;