import style from "./Titre.module.css";
import { useLocation } from "react-router-dom";
export default function Titre() {
  const location = useLocation();
  return (
    <div className={style.container}>
      {location.pathname === "/questionnaire_en_attente" && (
        <h1>Questionnaire En Attente</h1>
      )}
      {location.pathname === "/questionnaire_non_cloture" && (
        <h1>Questionnaire Non Cloturer</h1>
      )}
      {location.pathname === "/questionnaire_cloture" && (
        <h1>Questionnaire Cloturer</h1>
      )}
      {location.pathname === "/parametre" && (
        <div className={style.path}>
        <h1>Parametre</h1>
        <span>Bienvenue sur la page des paramtres</span>
        </div>
      )}
      <input type="search" placeholder="Search Here" />
    </div>
  );
}
