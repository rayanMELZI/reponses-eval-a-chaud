import style from "./ToggleProfile.module.css";
import { useState } from "react";

export default function ToggleProfile() {
  const [active, setActive] = useState("Profil");
  return (
    <div className={style.container}>
      <a href="#Profil" className={style.a}>
        <h3
          className={active === "Profil" ? style.active : null}
          onClick={() => setActive("Profil")}
        >
          Profil
        </h3>
      </a>

      <a href="#AuthLDAP" className={style.a}>
        <h3
          className={active === "AuthLDAP" ? style.active : null}
          onClick={() => setActive("AuthLDAP")}
        >
          Authentification LDAP
        </h3>
      </a>

      <a href="#Messagerie" className={style.a}>
        <h3
          className={active === "Messagerie" ? style.active : null}
          onClick={() => setActive("Messagerie")}
        >
          Messagerie
        </h3>
      </a>

      <a href="#Synchronisation" className={style.a}>
        <h3
          className={active === "Synchronisation" ? style.active : null}
          onClick={() => setActive("Synchronisation")}
        >
          Synchronisation
        </h3>
      </a>
    </div>
  );
}
