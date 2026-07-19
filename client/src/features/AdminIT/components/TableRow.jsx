import React from "react";
import style from "./TableRow.module.css";
import BtnAjoute from "./BtnAjoute";

import { useState } from "react";
import CloseBtn from "./CloseBtn";

function TableRow({
  nom,
  prenom,
  fonction,
  structure,
  action,
  border,
  lineHeight,
}) {
  const [ajoute, setAjoute] = useState(false);
  return (
    <div
      className={style.details}
      style={{
        "--color": ajoute ? "#F29E4F" : "#B1B5B8",
        border:
          border !== undefined && border === true
            ? `solid ${ajoute ? "#F29E4F" : "#B1B5B8"} 1px`
            : null,
        padding:
          lineHeight !== undefined && lineHeight === "small"
            ? "5px 10px"
            : "20px 10px",
      }}
    >
      <div className={style.item}>{nom}</div>
      <div className={style.item}>{prenom}</div>
      <div className={style.item}>{fonction}</div>
      <div className={style.item}>{structure}</div>
      <div className={style.item}>
        {action === undefined ? (
          <BtnAjoute ajoute={ajoute} setAjoute={setAjoute} />
        ) : (
          action
        )}
      </div>
    </div>
  );
}

export default TableRow;
