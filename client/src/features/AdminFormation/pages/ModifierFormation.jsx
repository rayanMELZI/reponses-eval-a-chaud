import style from "./ModifierFormation.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Titre from "../components/Titre";
import QuestDetails from "../components/QuestDetails";
import Footer from "../components/Footer";
import AddFormationForm from "../components/AddFormationForm";
import CloseBtn from "../components/CloseBtn";
import Button from "../components/Button";
import AddParticipant from "../components/AddParticipant";

import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function ModifierFormation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formationID } = useParams();

  const [active, setActive] = useState(false);
  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

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

  const [participations, setParticipations] = useState([]);
  const [membresConcernes, setMembresConcernes] = useState([]);
  const [membresAjoutes, setMembresAjoutes] = useState(
    membresConcernes.map((mbr) => {
      return {
        userID: mbr.userID,
        nom: mbr.nom,
        prenom: mbr.prenom,
        fonction: mbr.fonction,
        structureID: mbr.structureID,
        action: (
          <CloseBtn onClick={() => handleRemoveParticipant(mbr.userID)} />
        ),
      };
    })
  );
  const [concerneParNotifications, setConcerneParNotifications] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subject = "Questionnaire d'évaluation a remplire";
    const message = `Bonjour,

Un questionnaire d'évaluation pour la formation que vous avez suivie a été créé. Veuillez le trouver et le remplir dans l'application web des questionnaires d'évaluation.

Merci pour votre collaboration.`;

    try {
      // Update the formation
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/formation/${formationID}`,
        formation
      );

      // Update participants
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/participations/${formationID}`,
        { participations }
      );
      // console.log("Participations updated successfully:", responsePrt.data);
      // await Promise.all(
      //   concerneParNotifications.map(async (participant) => {
      //     const to = participant.email;
      //     await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/send-notification`, {
      //       to,
      //       subject,
      //       message,
      //     });
      //   })
      // );

      alert("Formation et participants modifiés avec succès");

      if (location.pathname.includes("/formations_cloture")) {
        navigate(
          `/AdminFormation/formations_cloture/reponses_formation/${formationID}`
        );
      } else {
        navigate(
          `/AdminFormation/formations_non_cloture/reponses_formation/${formationID}`
        );
      }

      await Promise.all(
        concerneParNotifications.map(async (participant) => {
          const to = participant.email;
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/send-notification`,
            {
              to,
              subject,
              message,
            }
          );
        })
      );
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la formation et des participants:",
        error
      );
      alert(
        "Erreur lors de la modification de la formation et des participants"
      );
    }
  };

  useEffect(() => {
    setParticipations(
      membresConcernes.map((participant) => {
        return { utilisateurID: participant.userID };
      })
    );
    console.log("participations :", participations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membresConcernes]);

  const handleRemoveParticipant = (id) => {
    setMembresConcernes((prev) =>
      prev.filter((participant) => participant.userID !== id)
    );
    setConcerneParNotifications((prev) =>
      prev.filter((participant) => participant.userID !== id)
    );
  };

  useEffect(() => {
    setMembresAjoutes(
      membresConcernes.map((mbr) => ({
        userID: mbr.userID,
        nom: mbr.nom,
        prenom: mbr.prenom,
        fonction: mbr.fonction,
        structureID: mbr.structureID,
        action: (
          <CloseBtn onClick={() => handleRemoveParticipant(mbr.userID)} />
        ),
      }))
    );
  }, [membresConcernes]);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/formations/${formationID}/participations`
        );
        const formatedData = response.data.map((participant) => ({
          userID: participant.utilisateurID,
          nom: participant.nom,
          prenom: participant.prenom,
          fonction: participant.fonction,
          structureID: participant.nom_structure,
        }));
        // console.log(formatedData);
        setMembresConcernes(formatedData);
      } catch (error) {
        console.error("Error fetching participations:", error);
      }
    };
    fetchParticipations();
  }, [formationID]);

  useEffect(() => {
    // console.log(membresAjoutes);
    console.log("membresConcernes :", membresConcernes);
  }, [membresConcernes]);

  useEffect(() => {
    console.log("concerneParNotifications :", concerneParNotifications);
  }, [concerneParNotifications]);

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
        <Titre searchbar={false} titre="Modifier la formation" />
        <AddFormationForm formation={formation} setFormation={setFormation} />
        <Titre
          titre="Membre concené"
          component={
            <Button
              content="Ajouter un Participant"
              onClick={handleClick}
              btnStyle="white"
            />
          }
        />
        <QuestDetails
          columns={["Nom", "Prénom", "Fonction", "Structure", "Action"]}
          propData={membresAjoutes}
          dataType="utilisateur"
        />

        <AddParticipant
          active={active}
          setActive={setActive}
          setMembresConcernes={setMembresConcernes}
          membresConcernes={membresConcernes}
          setConcerneParNotifications={setConcerneParNotifications}
          concerneParNotifications={concerneParNotifications}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px 80px",
          }}
        >
          <Button content="Modifier la formation" onClick={handleSubmit} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
