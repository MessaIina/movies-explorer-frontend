import React from "react";
import { NavLink } from "react-router-dom";
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import "./Sidebar.css";

const Sidebar = ({ sidebarIsActive, onSetSideBarIsActive }) => {
  const lightClass = "profile-btn_light";

  return (
    <nav className={`sidebar${sidebarIsActive ? " sidebar_active" : ""}`}>
      <div className="sidebar__blur">
        <div className="sidebar__opacity"></div>
        <div className="sidebar__content">
          <button
            type="button"
            className="sidebar__close"
            onClick={onSetSideBarIsActive}
          ></button>
          <ul className="sidebar__list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar__list-item sidebar__list-item_active link"
                    : "sidebar__list-item link"
                }
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar__list-item sidebar__list-item_active link"
                    : "sidebar__list-item link"
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar__list-item sidebar__list-item_active link"
                    : "sidebar__list-item link"
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="sidebar__profile-btn">
            <ProfileBtn lightClass={lightClass} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;