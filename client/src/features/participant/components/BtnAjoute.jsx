import React from "react";
import style from "./BtnAjoute.module.css";

function BtnAjoute({ ajoute, setAjoute }) {
  function ajouter() {
    setAjoute((ajt) => !ajt);
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
