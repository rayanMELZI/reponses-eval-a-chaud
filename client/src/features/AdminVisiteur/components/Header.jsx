import style from "./Header.module.css";
import { NavLink, useLocation, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import SearchBarWithSuggestions from "../components/SearchBarWithSuggestions";

export default function Header() {
  const { formationID } = useParams();
  const [menuDroped, setMenuDroped] = useState(false);
  const [subMenuDroped, setSubMenuDroped] = useState(false);
  const [roles, setRoles] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/${
            JSON.parse(localStorage.getItem("userData")).utilisateurID
          }/roles`
        );
        const formatedData = response.data.map((role) => role.nom_role);
        setRoles(formatedData);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchRoles();
  }, []);

  const links = [
    { name: "Accueil", url: "/AdminVisiteur" },
    {
      name: "Formations non clôturé",
      url: "/AdminVisiteur/formations_non_cloture",
    },
    {
      name: "Formations clôturé",
      url: "/AdminVisiteur/formations_cloture",
    },
    { name: "Parametres", url: "/AdminVisiteur/parametre" },
  ];

  return (
    <div className={style.container}>
      {location.pathname === "/AdminVisiteur" && (
        <SearchBarWithSuggestions links={links} />
      )}
      {location.pathname === "/AdminVisiteur/formations_non_cloture" && (
        <div className={style.path}>
          <NavLink to="/AdminVisiteur" className={style.link}>
            Acceuil
          </NavLink>
          <span>{">"} Formations non clôturé</span>
        </div>
      )}
      {location.pathname.includes("/modifier_formation") ? (
        <div className={style.path}>
          <NavLink to="/AdminVisiteur" className={style.link}>
            Acceuil
          </NavLink>
          <span>{"> "}</span>

          <NavLink
            to="/AdminVisiteur/formations_non_cloture"
            className={style.link}
          >
            Formations non clôturé
          </NavLink>

          <span>{"> "}</span>

          <NavLink
            to={`/AdminVisiteur/formations_non_cloture/reponses_formation/${formationID}`}
            className={style.link}
          >
            Reponses de la Formation
          </NavLink>
          <span>{">"} Modifier la formation</span>
        </div>
      ) : location.pathname.includes("/formations_non_cloture") &&
        location.pathname.includes("/details_reponse") ? (
        <div className={style.path}>
          <NavLink to="/AdminVisiteur" className={style.link}>
            Acceuil
          </NavLink>
          <span>{"> "}</span>

          <NavLink
            to="/AdminVisiteur/formations_non_cloture"
            className={style.link}
          >
            Formations non clôturé
          </NavLink>

          <span>{"> "}</span>

          <NavLink
            to={`/AdminVisiteur/formations_non_cloture/reponses_formation/${formationID}`}
            className={style.link}
          >
            Reponses de la Formation
          </NavLink>
          <span>{">"} Details de la Reponse</span>
        </div>
      ) : (
        location.pathname.startsWith(
          "/AdminVisiteur/formations_non_cloture/reponses_formation"
        ) && (
          <div className={style.path}>
            <NavLink to="/AdminVisiteur" className={style.link}>
              Acceuil
            </NavLink>
            <span>{"> "}</span>

            <NavLink
              to="/AdminVisiteur/formations_non_cloture"
              className={style.link}
            >
              Formations non clôturé
            </NavLink>
            <span>{">"} Reponses de la Formation</span>
          </div>
        )
      )}
      {location.pathname === "/AdminVisiteur/ajouter_une_formation" && (
        <div className={style.path}>
          <NavLink to="/AdminVisiteur" className={style.link}>
            Acceuil
          </NavLink>
          <span>{">"} Ajouter une formation</span>
        </div>
      )}
      {location.pathname === "/AdminVisiteur/formations_cloture" && (
        <div className={style.path}>
          <NavLink to="/AdminVisiteur" className={style.link}>
            Acceuil
          </NavLink>
          <span>{">"} Formations clôturé</span>
        </div>
      )}
      {location.pathname.includes("/formations_cloture") &&
      location.pathname.includes("/details_reponse") ? (
        <div className={style.path}>
          <NavLink to="/AdminVisiteur" className={style.link}>
            Acceuil
          </NavLink>
          <span>{"> "}</span>

          <NavLink
            to="/AdminVisiteur/formations_cloture"
            className={style.link}
          >
            Formations clôturé
          </NavLink>

          <span>{"> "}</span>

          <NavLink
            to={`/AdminVisiteur/formations_cloture/reponses_formation/${formationID}`}
            className={style.link}
          >
            Reponses de la Formation
          </NavLink>
          <span>{">"} Details de la Reponse</span>
        </div>
      ) : (
        location.pathname.startsWith(
          "/AdminVisiteur/formations_cloture/reponses_formation"
        ) && (
          <div className={style.path}>
            <NavLink to="/AdminVisiteur" className={style.link}>
              Acceuil
            </NavLink>
            <span>{"> "}</span>

            <NavLink
              to="/AdminVisiteur/formations_cloture"
              className={style.link}
            >
              Formations clôturé
            </NavLink>
            <span>{">"} Reponses de la Formation</span>
          </div>
        )
      )}
      {location.pathname === "/AdminVisiteur/parametre" && (
        <div className={style.path}>
          <NavLink to="/AdminVisiteur" className={style.link}>
            Acceuil
          </NavLink>
          <span>{">"} Parametres</span>
        </div>
      )}
      <div className={style.img}>
        <img className={style.one} src="/bell.svg" alt="bell" />
        <img
          className={style.one}
          src="/Mask_group.svg"
          alt="profile"
          onClick={() => setMenuDroped((drop) => !drop)}
        />

        <div
          className={style.dropMenu}
          style={menuDroped ? { display: "flex" } : { display: "none" }}
          onMouseLeave={() => {
            setMenuDroped((drop) => !drop);
          }}
        >
          <p onClick={() => setSubMenuDroped((drop) => !drop)}>
            Changer le rôle
          </p>
          <ul
            style={subMenuDroped ? { display: "block" } : { display: "none" }}
          >
            {roles.map((role, i) => {
              return (
                <NavLink to={`/${role.replace(/\s/g, "")}`} key={i}>
                  <li>{role}</li>
                </NavLink>
              );
            })}
          </ul>
          <NavLink to="/" style={{ width: "100%", textAlign: "center" }}>
            <p>Se Deconecter</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
