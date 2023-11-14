import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MainContext } from "../../contexts/MainContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import Header from "../Header/Header";
import "./Profile.css";

const Profile = ({ handleUpdateUser, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const { errorMessage } = useContext(MainContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const { name, email } = values;

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid && (currentUser.name !== name || currentUser.email !== email)) {
      handleUpdateUser(values, resetForm);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="profile">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <form
            className="profile__form"
            name="register"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="profile__field">
              <label className="profile__label">Имя</label>
              <input
                pattern="^[a-zA-zа-яА-ЯёЁ\-\s]+"
                id="profile-name-input"
                placeholder="Введите имя"
                minLength="2"
                maxLength="30"
                type="text"
                name="name"
                className="profile__input"
                onChange={handleChange}
                value={name || ""}
                required
              />
              <span
                className={`${
                  !isValid && "profile__input-error_active"
                } profile__input-error`}
              >
                {errors.name}
              </span>
            </div>
            <div className="profile__field">
              <label className="profile__label">E-mail</label>
              <input
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                id="profile-email-input"
                placeholder="Введите почту"
                type="email"
                name="email"
                className="profile__input"
                onChange={handleChange}
                value={email || ""}
                required
              />
              <span
                className={`${
                  !isValid && "profile__input-error_active"
                } profile__input-error`}
              >
                {errors.email}
              </span>
            </div>
            <p
              className={`${
                errorMessage
                  ? "profile__edit-error profile__edit-error_active"
                  : "profile__edit-error"
              }`}
            >
              {errorMessage}
            </p>
            <ul className="profile__links">
              <li className="profile__link">
                <button
                  disabled={
                    !isValid ||
                    (currentUser.name === name && currentUser.email === email)
                  }
                  type="submit"
                  aria-label="Редактировать профиль"
                  className="profile__edit btn"
                >
                  Редактировать
                </button>
              </li>
              <li className="profile__link">
                <button
                  onClick={onSignOut}
                  className="profile__logout btn"
                  type="button"
                >
                  Выйти из аккаунта
                </button>
              </li>
            </ul>
          </form>
        </section>
      </main>
    </>
  );
};

export default Profile;