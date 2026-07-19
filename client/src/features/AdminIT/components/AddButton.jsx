import React from "react";
import { NavLink } from "react-router-dom";

import style from "./AddButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddButton() {
  return (
    <NavLink to="/AdminIT/ajouter_un_membre">
      <button className={style.addBtn}>
        <FontAwesomeIcon icon={faPlus} size="2x" className="fa-fw" />
      </button>
    </NavLink>
  );
}

export default AddButton;
