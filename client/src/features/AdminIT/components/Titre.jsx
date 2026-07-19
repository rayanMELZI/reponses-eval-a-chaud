import style from "./Titre.module.css";
import { useLocation } from "react-router-dom";
export default function Titre({ titre, searchbar, component, padding, size }) {
  const location = useLocation();
  return (
    <div
      className={style.container}
      style={padding === undefined ? null : padding}
    >
      {titre === undefined ? (
        location.pathname === "/AdminIT/gerer_les_membres" ? (
          <h1
            style={
              size !== undefined && size === "small"
                ? { fontSize: "16px" }
                : null
            }
          >
            Gérer les membres
          </h1>
        ) : location.pathname === "/AdminIT/ajouter_un_membre" ? (
          <h1
            style={
              size !== undefined && size === "small"
                ? { fontSize: "16px" }
                : null
            }
          >
            Ajouter un membre local
          </h1>
        ) : location.pathname === "/AdminIT/gerer_les_roles" ? (
          <h1
            style={
              size !== undefined && size === "small"
                ? { fontSize: "16px" }
                : null
            }
          >
            Gérer les roles
          </h1>
        ) : (
          <div className={style.path}>
            <h1
              style={
                size !== undefined && size === "small"
                  ? { fontSize: "16px" }
                  : null
              }
            >
              Parametres
            </h1>
            <span>Bienvenue sur la page des paramtres</span>
          </div>
        )
      ) : (
        <h1
          style={
            size !== undefined && size === "small" ? { fontSize: "16px" } : null
          }
        >
          {titre}
        </h1>
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
