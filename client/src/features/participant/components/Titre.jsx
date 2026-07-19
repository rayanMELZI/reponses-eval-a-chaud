import { Padding } from "@mui/icons-material";
import style from "./Titre.module.css";
import { useLocation } from "react-router-dom";
export default function Titre({ titre, searchbar, component }) {
  const location = useLocation();
  return (
    <div
      className={style.container}
      style={
        location.pathname === "/Participant/parametre"
          ? {
              padding: "30px 70px",
            }
          : {}
      }
    >
      {titre === undefined ? (
        location.pathname === "/Participant/questionnaire_en_attente" ? (
          <h1>Questionnaire En Attente</h1>
        ) : location.pathname === "/Participant/questionnaire_non_cloture" ? (
          <h1>Questionnaire Non Cloturer</h1>
        ) : location.pathname === "/Participant/questionnaire_cloture" ? (
          <h1>Questionnaire Cloturer</h1>
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
