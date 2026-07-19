import style from "./RolesChoice.module.css";
import React from "react";

function RolesChoice({ onChange }) {
  return (
    <div className={style.container}>
      <input
        className={style.input}
        type="checkbox"
        id="Participant"
        name="roles"
        value="Participant"
        onChange={onChange}
      />
      <label className={style.label} htmlFor="Participant">
        Participant
      </label>

      <input
        className={style.input}
        type="checkbox"
        id="AdminFormation"
        name="roles"
        value="Admin Formation"
        onChange={onChange}
      />
      <label className={style.label} htmlFor="AdminFormation">
        Admin Formation
      </label>

      <input
        className={style.input}
        type="checkbox"
        id="AdminIT"
        name="roles"
        value="Admin IT"
        onChange={onChange}
      />
      <label className={style.label} htmlFor="AdminIT">
        Admin IT
      </label>

      <input
        className={style.input}
        type="checkbox"
        id="AdminVisiteur"
        name="roles"
        value="Admin Visiteur"
        onChange={onChange}
      />
      <label className={style.label} htmlFor="AdminVisiteur">
        Admin Visiteur
      </label>
    </div>
  );
}

export default RolesChoice;
