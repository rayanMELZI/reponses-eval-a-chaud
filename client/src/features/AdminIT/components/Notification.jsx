import style from "./Notification.module.css";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Notification({ addStyle, btnColor }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `/api/allUsers-structure`
        );
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchUsers();
  }, []);

  const list = data.slice(0, 3);
  return (
    <div className={`${style.container} ${addStyle ? addStyle : ""}`}>
      <p className={style.text}>Membres Locaux</p>
      <div className={style.card}>
        {list.map((e, i) => (
          <div
            key={i}
            className={i === 2 ? style.details : style.notLastDetails}
          >
            <div>
              <p className={style.title}>{e.nom}</p>
              <p className={style.title}>{e.prenom}</p>
            </div>
            <div className={style.date}>
              <p>{e.nom_structure}</p>
            </div>
            <div className={style.date}>
              <p>{e.fonction}</p>
            </div>
            <div className={style.date}>
              <p>{e.role_default}</p>
            </div>
          </div>
        ))}
        <NavLink to="/AdminIT/gerer_les_membres" className={style.btnFather}>
          <button className={`${style.btn} ${btnColor ? btnColor : ""}`}>
            Voir plus
          </button>
        </NavLink>
      </div>
    </div>
  );
}
