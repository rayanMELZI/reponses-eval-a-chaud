import React from "react";
import style from "./BtnAjoute.module.css";

function BtnAjoute({ ajoute, setAjoute }) {
  return (
    <button
      className={!ajoute ? style.ajouter : style.ajouteDeja}
      onClick={() => setAjoute(!ajoute)}
    >
      {!ajoute ? "Ajouter" : "Ajouté(e)"}
    </button>
  );
}

export default BtnAjoute;
