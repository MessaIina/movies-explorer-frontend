import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import LogoIcon from "../../images/logo.svg";
import "./Login.css";

const Login = ({ handleLogin }) => {
  const { errorMessage } = useContext(MainContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
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
      <section className="auth">
        <Link className="auth__logo-link" to="/">
          <img src={LogoIcon} alt="Логотип сайта" className="auth__logo" />
        </Link>
        <h1 className="auth__title">Рады видеть!</h1>
        <form
          name="login"
          className="auth__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <label className="auth__field">
            E-mail
            <input
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              id="login-email-input"
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
              id="login-pass-input"
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
                ? "auth__submit-error auth__submit-error_active"
                : "auth__submit-error"
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
            Войти
          </button>
          <div className="auth__link-container">
            <p className="auth__link-question">Ещё не зарегистрированы?</p>
            <Link className="auth__link link" to="/signup">
              Регистрация
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;