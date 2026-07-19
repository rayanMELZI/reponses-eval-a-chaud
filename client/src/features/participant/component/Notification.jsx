import { useEffect, useState } from "react";
import style from "./Notification.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Notification({ addStyle, color }) {
  const navigate = useNavigate();
  const isCloture = false;
  const [data, setData] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userID = userData.utilisateurID;

  useEffect(() => {
    const endpoint = isCloture
      ? `${process.env.REACT_APP_API_BASE_URL}/AdminFormation/formations_cloture/${userID}`
      : `${process.env.REACT_APP_API_BASE_URL}/AdminFormation/formations_non_cloture/${userID}`;
    axios
      .get(endpoint)
      .then((response) => {
        const formations = response.data;
        const formationPromises = formations.map((formation) =>
          axios
            .get(
              `${process.env.REACT_APP_API_BASE_URL}/api/hasResponded/${formation.formationID}/${userID}`
            )
            .then((response) => ({
              ...formation,
              hasResponded: response.data.hasResponded,
            }))
        );

        Promise.all(formationPromises).then((formationResults) => {
          setData(formationResults);
        });
      })
      .catch((error) => {
        console.error("Error fetching formation data:", error);
      });
  }, [isCloture, userID]);
  const filterFormations = () => {
    return data.filter((formation) => !formation.hasResponded);
  };
  const filterNonClot = () => {
    return data.filter((formation) => formation.hasResponded && !isCloture);
  };

  const length = !addStyle ? filterFormations().length : filterNonClot().length;
  const list = !addStyle
    ? filterFormations().slice(0, 3)
    : filterNonClot().slice(0, 3);
  const render = length > 0;

  return (
    <div className={`${style.container} ${addStyle ? addStyle : ""}`}>
      <p className={style.text}>
        Vous avez <span className={addStyle ? style.span : ""}>{length}</span>{" "}
        questionnaire a remplir !
      </p>
      <div className={style.card}>
        {list.map((e, i) => (
          <div key={i} className={style.details} style={{ "--color": color }}>
            <div className={style.title}>
              <h2>{e.intitule}</h2>
              <h4>{e.org_formateur}</h4>
            </div>
            <p className={style.date}>
              Créer le {formatDate(e.date_debut_questionnaire)}
            </p>
          </div>
        ))}
        {render && (
          <button
            className={`${style.btn}`}
            onClick={() =>
              !addStyle
                ? navigate("/Participant/questionnaire_en_attente")
                : navigate("/Participant/questionnaire_non_cloture")
            }
          >
            Voir plus
          </button>
        )}
      </div>
    </div>
  );
}
