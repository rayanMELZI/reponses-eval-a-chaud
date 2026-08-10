import style from "./Questionnaire.module.css";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import BienvenueText from "../component/BienvenueText";
import QuestionnaireInfo from "../component/QuestionnaireInfo";
import Satisfaction from "../component/Satisfaction";
import TableDevaluation from "../component/TableDevaluation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Adjust date by adding one day
  date.setDate(date.getDate());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Questionnaire() {
  const { formationID } = useParams();
  const [isCloture, setIsCloture] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/formation/${formationID}`)
      .then((response) => {
        const formation = response.data;
        const now = formatDate(new Date());
        const endDate = formation.date_fin_questionnaire;
        setIsCloture(now > endDate);
      })
      .catch((error) => {
        console.error("Error fetching formation details:", error);
      });
  });

  return (
    <div className={style.container}>
      <Header />
      <Sidebar />
      <BienvenueText />
      <QuestionnaireInfo />
      <Satisfaction />
      <TableDevaluation isCloture={isCloture} />
    </div>
  );
}
