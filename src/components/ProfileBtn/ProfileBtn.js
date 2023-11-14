import React from "react";
import { Link } from "react-router-dom";
import profileIcon from "../../images/profile_icon.svg";
import "./ProfileBtn.css";

const ProfileBtn = ({ lightClass }) => {
  const moviesOrProfileRoute = !(
    window.location.href.includes("profile") ||
    window.location.href.includes("movies")
  );

  return (
    <Link
      to="/profile"
      className={`profile-btn link ${lightClass} ${
        moviesOrProfileRoute ? "profile-btn_dark" : ""
      }`}
    >
      <p className="profile-btn__text">Аккаунт</p>
      <img
        src={profileIcon}
        alt="Иконка профиля"
        className="profile-btn__icon"
      />
    </Link>
  );
};

export default ProfileBtn;
