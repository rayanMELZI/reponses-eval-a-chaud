import style from "./QuestionnaireInfo.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Adjust date by adding one day
  date.setDate(date.getDate());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function QuestionnaireInfo() {
  const [formation, setFormation] = useState(null);
  const { formationID } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/formation/${formationID}`)
      .then((response) => response.json())
      .then((data) => setFormation(data))
      .catch((error) => console.error("Error fetching formation data:", error));
  }, [formationID]);

  if (!formation) {
    return <div>Loading...</div>;
  }
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.col}>
          <h2>Intitulé de la formation :</h2>
          <span>{truncateText(formation.intitule, 40)}</span>
        </div>
        <div className={style.col}>
          <h2>Nom du formateur :</h2>
          <span>{formation.nom_formateur}</span>
        </div>
        <div className={style.col}>
          <h2>Organisme Formateur :</h2>
          <span>{formation.org_formateur}</span>
        </div>
        <div className={style.col}>
          <h2>Lieu :</h2>
          <span>{formation.lieu}</span>
        </div>
        <div className={style.col}>
          <h2>période de formation : </h2>
          <span>du {formatDate(formation.date_debut)}</span>
        </div>
        <div className={style.col}>
          <h2>au : </h2>
          <span>{formatDate(formation.date_fin)}</span>
        </div>
      </div>
    </div>
  );
}
