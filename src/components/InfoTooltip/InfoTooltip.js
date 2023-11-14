import React, { useEffect } from "react";
import InfoTooltipStatusError from "../../images/error.svg";
import InfoTooltipStatusAccept from "../../images/accept.svg";
import "./InfoTooltip.css";

const InfoTooltip = ({ isOpen, onClose, tooltipStatus }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlay = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleOverlay);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`popup popup_tooltip ${isOpen && " popup_opened"}`}>
      <div className="popup__container popup__container_tooltip">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="popup__image-tooltip"
          src={tooltipStatus ? InfoTooltipStatusAccept : InfoTooltipStatusError}
          alt="Статус попапа"
        />
        <h2 className="popup__title">
          {tooltipStatus
            ? "Успешно!"
            : "Что-то пошло не так!"}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;