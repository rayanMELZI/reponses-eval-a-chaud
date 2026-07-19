import React from "react";
import style from "./BtnAjoute.module.css";

function BtnAjoute({
  ajoute,
  setAjoute,
  setConcerneParNotifications,
  concerneParNotifications,
  userID,
  nom,
  prenom,
  fonction,
  structure,
  email,
}) {
  function ajouter() {
    setAjoute((ajt) => !ajt);
    console.log(concerneParNotifications);
    if (setConcerneParNotifications !== undefined) {
      if (ajoute !== true) {
        setConcerneParNotifications((prev) => [
          ...prev,
          { userID, nom, prenom, fonction, structureID: structure, email },
        ]);
      } else {
        setConcerneParNotifications((prev) =>
          prev.filter((membre) => membre.userID !== userID)
        );
      }
    }
  }

  return (
    <button
      className={!ajoute ? style.ajouter : style.ajouteDeja}
      onClick={ajouter}
    >
      {!ajoute ? "Ajouter" : "Ajouté(e)"}
    </button>
  );
}

export default BtnAjoute;
