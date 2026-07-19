import style from "./CloseBtn.module.css";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CloseBtn({ onClick }) {
  return (
    <div className={style.btn} onClick={onClick}>
      <FontAwesomeIcon icon={faTimes} size="lg" className="fa-fw" />
    </div>
  );
}

export default CloseBtn;
