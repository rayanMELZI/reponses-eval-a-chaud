import style from "./AjouterFormation.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Titre from "../components/Titre";
import QuestDetails from "../components/QuestDetails";
import Footer from "../components/Footer";
import AddFormationForm from "../components/AddFormationForm";
import CloseBtn from "../components/CloseBtn";
import Button from "../component/Button";
import AddParticipant from "../components/AddParticipant";

import { useState } from "react";
import React from "react";

export default function QuestNonClot() {
  const [, setActive] = useState(false);
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
        <AddFormationForm />
        <Titre
          titre="Membre concené"
          component={
            <Button
              content="Ajouter un Participant"
              onClick={() => setActive(true)}
            />
          }
        />
        <QuestDetails
          columns={["Nom", "Prénom", "Fonction", "Structure", "Action"]}
          propData={[
            {
              nom: "DUPONT",
              prenom: "Jean",
              fonction: "Ingénieur Etudes et Développement Informatique",
              structure: "IT",
              action: <CloseBtn />,
            },
            {
              nom: "MARTIN",
              prenom: "Mohammed Nouredine",
              fonction: "Ingénieur Etudes et Développement Informatique",
              structure: "IT",
              action: <CloseBtn />,
            },
            {
              nom: "DUPONT",
              prenom: "Jean",
              fonction: "Ingénieur Etudes et Développement Informatique",
              structure: "IT",
              action: <CloseBtn />,
            },
            {
              nom: "MARTIN",
              prenom: "Mohammed Nouredine",
              fonction: "Ingénieur Etudes et Développement Informatique",
              structure: "IT",
              action: <CloseBtn />,
            },
            {
              nom: "nom",
              prenom: "prenom",
              fonction: "fonction",
              structure: "structure",
              action: <CloseBtn />,
            },
          ]}
        />

        <AddParticipant />

        <Footer />
      </div>
    </div>
  );
}
