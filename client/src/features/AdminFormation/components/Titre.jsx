import style from "./Titre.module.css";
import { useLocation } from "react-router-dom";
export default function Titre({ titre, searchbar, component }) {
  const location = useLocation();
  return (
    <div className={style.container}>
      {titre === undefined ? (
        location.pathname === "/AdminFormation/formations_non_cloture" ? (
          <h1>Formations non clôturé</h1>
        ) : location.pathname === "/AdminFormation/ajouter_une_formation" ? (
          <h1>Ajouter une formation</h1>
        ) : location.pathname === "/AdminFormation/formations_cloture" ? (
          <h1>Formations clôturé</h1>
        ) : (
          <div className={style.path}>
            <h1>Parametres</h1>
            <span>Bienvenue sur la page des paramtres</span>
          </div>
        )
      ) : (
        <h1>{titre}</h1>
      )}
      {(searchbar === undefined && component === undefined) ||
      searchbar === true ? (
        <input type="search" placeholder="Search Here" />
      ) : component !== undefined ? (
        component
      ) : null}
    </div>
  );
}
