import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import { useValidation } from "../../hooks/useValidation";
import Logo from "../../images/logo.svg";
import "./Login.css";

const Login = ({ handleLogin }) => {
  const { errorMessage } = useContext(MainContext);
  const { values, handleChange, errors, isValid, resetForm } =
  useValidation();
  const { email, password } = values;

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    if (isValid) {
      handleLogin(values, resetForm);
    }
  };

  return (
    <main>
      <section className="login">
        <Link className="login__logo-link" to="/">
          <img src={Logo} alt="Логотип сайта" className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form
          name="login"
          className="login__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <label className="login__field">
            E-mail
            <input
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              id="login-email-input"
              type="email"
              name="email"
              className="login__input"
              onChange={handleChange}
              value={email || ""}
              required
            />
            <span
              className={`${
                !isValid && "login__input-error_active"
              } login__input-error`}
            >
              {errors.email}
            </span>
          </label>
          <label className="login__field">
            Пароль
            <input
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$"
              minLength="8"
              maxLength="20"
              id="login-pass-input"
              type="password"
              name="password"
              className="login__input"
              onChange={handleChange}
              value={password || ""}
              required
            />
            <span
              className={`${
                !isValid && "login__input-error_active"
              } login__input-error`}
            >
              {errors.password}
            </span>
          </label>
          <p
            className={`${
              errorMessage
                ? "login__submit-error login__submit-error_active"
                : "login__submit-error"
            }`}
          >
            {errorMessage}
          </p>
          <button
            disabled={!isValid}
            type="submit"
            className="login__submit btn"
            aria-label="Сохранить данные"
          >
            Войти
          </button>
          <div className="login__link-container">
            <p className="login__link-question">Ещё не зарегистрированы?</p>
            <Link className="login__link link" to="/signup">
              Регистрация
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;