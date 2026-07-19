import style from "./DetailsReponse.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BienvenueText from "../components/BienvenueText";
import QuestionnaireInfo from "../components/QuestionnaireInfo";
import QuestUserInfo from "../components/QuestUserInfo";
import Satisfaction from "../components/Satisfaction";
import TableDevaluation from "../components/TableDevaluation";
import TauxDeSatisfaction from "../components/TauxDeSatisfaction";
import Button from "../components/Button";
import Footer from "../components/Footer";

import PrintComponent from "../components/PrintComponent";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function DetailsReponse() {
  const [tauxSatis, setTauxSatis] = useState();
  let { formationID, reponseID } = useParams();

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/reponses/${formationID}/${reponseID}`
        );
        // console.log(response.data, response.data[0].taux_satisfaction);
        setTauxSatis(response.data[0].taux_satisfaction);
      } catch (error) {
        console.error("Failed to fetch usre data:", error);
      }
    };

    fetchUserData();
  }, [formationID, reponseID]);

  return (
    <div className={style.container}>
      <Sidebar />
      <div
        style={{
          maxHeight: "100vh",
          width: "100%",
          display: "flex",
          gap: "35px",
          flexDirection: "column",
        }}
      >
        <Header />
        <div
          style={{
            padding: "0 70px",
          }}
        >
          <BienvenueText />
          <QuestUserInfo />
          <QuestionnaireInfo />
          <TauxDeSatisfaction taux={tauxSatis} />
          <Satisfaction />
          <TableDevaluation isCloture={true} />
          <TauxDeSatisfaction taux={tauxSatis} bottom={true} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px 0 0",
            }}
          >
            <Button content="Imprimer" onClick={handlePrint} />
          </div>

          <div style={{ display: "none" }}>
            <PrintComponent
              ref={printRef}
              title="Réponse au questionnaire d'évaluation"
              // repID={29}
              repID={reponseID}
              taux={tauxSatis}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
