import style from "./TableRow.module.css";
import BtnAjoute from "./BtnAjoute";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
