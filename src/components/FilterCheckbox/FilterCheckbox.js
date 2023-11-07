import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {

  return (
    <form className="checkbox">
      <label className="checkbox__label btn">
        <input className="checkbox__input" type="checkbox" placeholder="Фильтр 'короткометражки'" />
        <span className="checkbox__switch"></span>
      </label>
    </form>
  );
};

export default FilterCheckbox;