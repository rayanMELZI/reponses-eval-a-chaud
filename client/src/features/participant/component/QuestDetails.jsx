import { useEffect } from "react";
import style from "./QuestDetails.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Function to format date to yyyy-mm-dd
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Adjust date by adding one day
  date.setDate(date.getDate());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateTimeRemaining = (endDate) => {
  const end = new Date(endDate);
  const now = new Date();
  const difference = end - now;

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));

  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
};

export default function QuestDetails({
  color,
  isCloture,
  formations,
  setFormations,
  filteredFormations,
  setFilteredFormations,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  // const [formations, setFormations] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userID = userData.utilisateurID;

  useEffect(() => {
    const endpoint = isCloture
      ? `/api/AdminFormation/formations_cloture/${userID}`
      : `/api/AdminFormation/formations_non_cloture/${userID}`;
    axios
      .get(endpoint)
      .then((response) => {
        const formations = response.data;
        const formationPromises = formations.map((formation) =>
          axios
            .get(
              `/api/hasResponded/${formation.formationID}/${userID}`
            )
            .then((response) => ({
              ...formation,
              hasResponded: response.data.hasResponded,
            }))
        );

        Promise.all(formationPromises).then((formationResults) => {
          setFormations(formationResults);
          setFilteredFormations(formationResults);
        });
      })
      .catch((error) => {
        console.error("Error fetching formation data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCloture, userID]);

  const filterFormations = () => {
    if (location.pathname === "/Participant/questionnaire_cloture") {
      // return formations.filter((formation) => formation.hasResponded);
      return formations;
    } else if (location.pathname === "/Participant/questionnaire_non_cloture") {
      return formations.filter(
        (formation) => formation.hasResponded && !isCloture
      );
    } else {
      return formations.filter((formation) => !formation.hasResponded);
    }
  };

  return (
    <div className={style.container}>
      <ul className={style.info}>
        <li>Intitulé de la formation</li>
        <li>Organisme Formateur</li>
        <li>Durée de la formation</li>
        <li>Début du questionnaire</li>
        <li>
          {location.pathname === "/Participant/questionnaire_cloture"
            ? "Fin du questionnaire"
            : "Temps restant"}
        </li>
      </ul>
      <div className={style.wrapper}>
        {filterFormations().map((formation, i) => (
          <div
            className={style.details}
            style={{ "--color": color }}
            key={i}
            onClick={() =>
              navigate(`/Participant/questionnaires/${formation.formationID}`)
            }
          >
            <div className={style.item}>
              <h3>{formation.intitule}</h3>
            </div>
            <div className={style.item}>
              <h5>{formation.org_formateur}</h5>
            </div>
            <div className={`${style.item} ${style.span}`}>
              <span>du {formatDate(formation.date_debut)}</span>
              <span>au {formatDate(formation.date_fin)}</span>
            </div>
            <div className={style.item}>
              {formatDate(formation.date_debut_questionnaire)}
            </div>
            <div className={style.item}>
              {isCloture
                ? formatDate(formation.date_fin_questionnaire)
                : calculateTimeRemaining(formation.date_fin_questionnaire)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
