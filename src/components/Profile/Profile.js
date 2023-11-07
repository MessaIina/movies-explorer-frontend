import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import Header from "../Header/Header";
import "./Profile.css";

const Profile = ({ handleEditProfile, onLogOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const { name, email } = values;

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      handleEditProfile(values);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form
            className="profile__form"
            name="register"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="profile__field">
              <label className="profile__label">Имя</label>
              <input
                id="profile-name-input"
                placeholder="Имя"
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
                placeholder="E-mail"
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
          </form>
          <ul className="profile__links">
            <li className="profile__link">
              <button
                type="submit"
                aria-label="Редактировать профиль"
                className="profile__edit btn"
              >
                Редактировать
              </button>
            </li>
            <li className="profile__link">
              <button onClick={onLogOut} className="profile__logout link" type="btn">
                Выйти из аккаунта
              </button>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default Profile;