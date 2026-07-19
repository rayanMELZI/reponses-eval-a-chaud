import style from "./AjouterFormation.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Titre from "../components/Titre";
import Footer from "../components/Footer";
import Table from "../components/EnhancedTableHead";
import AddFormationForm from "../components/AddFormationForm";
import Button from "../components/Button";

import PrintComponent from "../components/PrintComponent";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

import { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

function DI({ reponseID, tauxSatisfaction }) {
  //DI: Details/Impression
  const { formationID } = useParams();
  const location = useLocation();

  let clotureOuPas;
  if (location.pathname.includes("formations_cloture")) {
    clotureOuPas = "formations_cloture";
  } else {
    clotureOuPas = "formations_non_cloture";
  }

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <NavLink
        to={`/AdminFormation/${clotureOuPas}/reponses_formation/${formationID}/details_reponse/${reponseID}`}
        style={{ color: "#007FFF", opacity: "70%" }}
      >
        <AddBoxRoundedIcon />
      </NavLink>
      <LocalPrintshopIcon color="action" onClick={handlePrint} />

      <div style={{ display: "none" }}>
        <PrintComponent
          ref={printRef}
          title="Réponse au questionnaire d'évaluation"
          repID={reponseID}
          taux={tauxSatisfaction}
        />
      </div>
    </div>
  );
}

function ReponsesFormation() {
  const location = useLocation();
  let navigate = useNavigate();
  const { formationID } = useParams();
  const [reponses, setReponses] = useState([]);
  const [formation, setFormation] = useState({
    intitule: "",
    org_formateur: "",
    nom_formateur: "",
    lieu: "",
    date_debut: "",
    date_fin: "",
    date_debut_questionnaire: "",
    date_fin_questionnaire: "",
  });

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

  useEffect(() => {
    const fetchFormationInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/formations/${formationID}`
        );
        const formatedData = response.data[0];
        setFormation((prev) => {
          return {
            ...prev,
            intitule: formatedData.intitule,
            org_formateur: formatedData.org_formateur,
            nom_formateur: formatedData.nom_formateur,
            lieu: formatedData.lieu,
            date_debut: formatDate(formatedData.date_debut),
            date_fin: formatDate(formatedData.date_fin),
            date_debut_questionnaire: formatDate(
              formatedData.date_debut_questionnaire
            ),
            date_fin_questionnaire: formatDate(
              formatedData.date_fin_questionnaire
            ),
          };
        });
      } catch (error) {
        console.error("Error fetching formation:", error);
      }
    };

    fetchFormationInfo();
  }, [formationID]);

  const handleClick = () => {
    if (location.pathname.includes("formations_non_cloture")) {
      navigate(
        `/AdminFormation/formations_non_cloture/reponses_formation/modifier_formation/${formationID}`
      );
    }
    if (location.pathname.includes("formations_cloture")) {
      navigate(
        `/AdminFormation/formations_cloture/reponses_formation/modifier_formation/${formationID}`
      );
    }
  };

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/reponses/${formationID}`
        );
        const formatedData = response.data.map((rep) => {
          return {
            id: rep.reponseID,
            date: formatDate(rep.date_reponse),
            nom: rep.nom,
            prenom: rep.prenom,
            fonction: rep.fonction,
            structure: rep.nom_structure,
            TdS: `${rep.taux_satisfaction}%`,
            DI: (
              <DI
                reponseID={rep.reponseID}
                tauxSatisfaction={rep.taux_satisfaction}
              />
            ),
          };
        });
        setReponses(formatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      <Sidebar />
      <div
        style={{
          maxHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Titre titre="Reponses de la Formation" searchbar={false} />
        {/* {!location.pathname.includes("formations_cloture") && ( */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 80px",
            marginBottom: "-50px",
            position: "relative",
            top: "15px",
          }}
        >
          <Button content="Modifier" btnStyle="white" onClick={handleClick} />
        </div>
        {/* )} */}
        <AddFormationForm
          formation={formation}
          setFormation={setFormation}
          isDisabled={true}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px 40px",
          }}
        >
          <Table rows={reponses} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ReponsesFormation;
