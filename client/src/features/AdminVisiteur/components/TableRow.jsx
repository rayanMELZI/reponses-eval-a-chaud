import style from "./TableRow.module.css";
import BtnAjoute from "./BtnAjoute";
import CloseBtn from "../components/CloseBtn";

import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

function TableRow({
  userID,
  nom,
  prenom,
  fonction,
  structure,
  action,
  border,
  lineHeight,
  membresConcernes,
  setMembresConcernes,
}) {
  // const { formationID } = useParams();

  const [ajoute, setAjoute] = useState(false);

  useEffect(() => {
    if (setMembresConcernes !== undefined) {
      if (ajoute === true) {
        setMembresConcernes((prev) => [
          ...prev,
          { userID, nom, prenom, fonction, structureID: structure },
        ]);
      } else {
        setMembresConcernes((prev) =>
          prev.filter((membre) => membre.userID !== userID)
        );
      }
    }
  }, [ajoute]);

  useEffect(() => {
    if (membresConcernes !== undefined) {
      // if (!membresConcernes.find((membre) => membre.userID === userID)) {
      //   setAjoute(false);
      // }
      if (membresConcernes.find((membre) => membre.userID === userID)) {
        setAjoute(true);
      }
    }
  }, [membresConcernes]);

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
