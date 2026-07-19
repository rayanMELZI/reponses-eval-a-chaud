import style from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <div className={style.container}>
      {location.pathname === "/" && (
        <input type="search" placeholder="Search Here" />
      )}
      {location.pathname === "/questionnaire_en_attente" && (
        <div className={style.path}>
          <NavLink to="/" className={style.link}>
            Acceuil
          </NavLink>
          <span>{">"} Questionnaire en attente</span>
        </div>
      )}
      {location.pathname === "/questionnaire_non_cloture" && (
        <div className={style.path}>
          <NavLink to="/" className={style.link}>
            Acceuil
          </NavLink>
          <span>{">"} Questionnaire non cloturer</span>
        </div>
      )}
      {location.pathname === "/questionnaire_cloture" && (
        <div className={style.path}>
          <NavLink to="/" className={style.link}>
            Acceuil
          </NavLink>
          <span>{">"} Questionnaire cloturer</span>
        </div>
      )}
      {location.pathname === "/parametre" && (
        <div className={style.path}>
          <NavLink to="/" className={style.link}>
            Acceuil
          </NavLink>
          <span>{">"} Parametre</span>
        </div>
      )}
      <div className={style.img}>
        <img className={style.one} src="bell.svg" alt="bell" />
        <img className={style.one} src="Mask_group.svg" alt="profile" />
      </div>
    </div>
  );
}
