import React from "react";
import style from "./AppSettings.module.css";
import Button from "./Button";

const roles = ["Participant", "Admin Formation", "Admin IT", "Admin Visiteur"];

function AppSettings() {
  return (
    <div className={style.container} id="application">
      <h2 className={style.title}>Application</h2>
      <form action="POST" className={style.form}>
        <label htmlFor="email">Role par défaut</label>
        <select name="" id="" value={roles[1]} className={style.input}>
          {roles.map((role) => (
            <option value={role}>{role}</option>
          ))}
        </select>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button content="Enregistrer" />
        </div>
      </form>
    </div>
  );
}

export default AppSettings;
