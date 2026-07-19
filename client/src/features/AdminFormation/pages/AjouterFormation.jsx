import style from "./AjouterFormation.module.css";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function AjouterFormation() {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subject = "Questionnaire d'évaluation a remplire";
    const message = `Bonjour,

Un questionnaire d'évaluation pour la formation que vous avez suivie a été créé. Veuillez le trouver et le remplir dans l'application web des questionnaires d'évaluation.

Merci pour votre collaboration.`;
    try {
      // Create the formation
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/formation`,
        formation
      );
      const formationID = response.data.formationID;

      // Add participants
      await Promise.all(
        membresConcernes.map(async (participant) => {
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/participation`,
            {
              formationID,
              utilisateurID: participant.userID,
            }
          );

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

      alert("Formation et participants ajoutés avec succès");

      navigate("/AdminFormation");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de la formation et des participants:",
        error
      );
      alert("Erreur lors de l'ajout de la formation et des participants");
    }
  };

  // useEffect(() => {
  //   console.log(membresConcernes);
  // }, [membresConcernes]);

  const handleRemoveParticipant = (id) => {
    setMembresAjoutes((prev) =>
      prev.filter((participant) => participant.userID !== id)
    );
    setMembresConcernes((prev) =>
      prev.filter((participant) => participant.userID !== id)
    );
  };

  useEffect(() => {
    setMembresAjoutes(
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
  }, [membresConcernes]);

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
        <Titre searchbar={false} />
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
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px 80px",
          }}
        >
          <Button content="Ajouter la formation" onClick={handleSubmit} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
