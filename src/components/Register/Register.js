import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import { useValidation } from "../../hooks/useValidation";
import LogoIcon from "../../images/logo.svg";
import "./Register.css";

const Register = ({ handleRegister }) => {
  const { errorMessage } = useContext(MainContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useValidation();

  const { name, email, password } = values;

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password || !name) {
      return;
    }
    if (isValid) {
      handleRegister(values, resetForm);
    }
  };

  return (
    <main>
      <section className="auth">
        <Link className="auth__logo-link" to="/">
          <img src={LogoIcon} alt="Логотип сайта" className="auth__logo" />
        </Link>
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form
          name="register"
          className="auth__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <label className="auth__field">
            Имя
            <input
              pattern="^[a-zA-zа-яА-ЯёЁ\-\s]+"
              id="reg-name-input"
              minLength="2"
              maxLength="30"
              type="text"
              name="name"
              className="auth__input"
              onChange={handleChange}
              value={name || ""}
              required
            />
            <span
              className={`${
                !isValid && "auth__input-error_active"
              } auth__input-error`}
            >
              {errors.name}
            </span>
          </label>
          <label className="auth__field">
            E-mail
            <input
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              id="reg-email-input"
              type="email"
              name="email"
              className="auth__input"
              onChange={handleChange}
              value={email || ""}
              required
            />
            <span
              className={`${
                !isValid && "auth__input-error_active"
              } auth__input-error`}
            >
              {errors.email}
            </span>
          </label>
          <label className="auth__field">
            Пароль
            <input
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$"
              minLength="8"
              maxLength="20"
              id="reg-pass-input"
              type="password"
              name="password"
              className="auth__input"
              onChange={handleChange}
              value={password || ""}
              required
            />
            <span
              className={`${
                !isValid && "auth__input-error_active"
              } auth__input-error`}
            >
              {errors.password}
            </span>
          </label>
          <p
            className={`${
              errorMessage
                ? "auth__submit-error auth__submit-error_register auth__submit-error_active"
                : "auth__submit-error auth__submit-error_register"
            }`}
          >
            {errorMessage}
          </p>
          <button
            disabled={!isValid}
            type="submit"
            className="auth__submit btn"
            aria-label="Сохранить данные"
          >
            Зарегистрироваться
          </button>
          <div className="auth__link-container">
            <p className="auth__link-question">Уже зарегистрированы?</p>
            <Link className="auth__link link" to="/signin">
              Войти
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;