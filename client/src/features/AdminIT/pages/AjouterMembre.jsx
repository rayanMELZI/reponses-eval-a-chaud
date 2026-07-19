import style from "./AjouterMembre.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Titre from "../components/Titre";
import Footer from "../components/Footer";
import FormModule from "../components/FormModule";
import RolesChoice from "../components/RolesChoice";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AjouterMembre() {
  const navigate = useNavigate();

  const [fonctions, setFonctions] = useState([]);
  const [structures, setStructures] = useState([]);

  useEffect(() => {
    const allUsersData = JSON.parse(localStorage.getItem("allUsersData"));
    const fonctionArray = Array.from(
      new Set(allUsersData.map((user) => user.fonction))
    );
    setFonctions(fonctionArray);

    const fetchStructures = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/structure`
        );
        const structureArray = Array.from(
          new Set(response.data.map((structure) => structure.nom_structure))
        );
        setStructures(structureArray);
      } catch (error) {
        console.error("Error fetching formations:", error);
      }
    };

    fetchStructures();
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
        <Titre searchbar={false} />
        <FormModule
          inputs={[
            [
              { name: "nom", label: "Nom", type: "text" },
              { name: "prenom", label: "Prénom", type: "text" },
            ],
            [
              {
                name: "fonction",
                label: "Fonction",
                type: "select",
                optionsType: "fonctions",
                options: fonctions,
              },
              {
                name: "nom_structure",
                label: "Structure",
                type: "select",
                optionsType: "structures",
                options: structures,
              },
            ],
            [
              {
                name: "roles",
                label: "Roles",
                type: "custom",
                optionsType: "roles",
                component: <RolesChoice />,
              },
            ],
            [{ name: "email", label: "Email", type: "email" }],
            [{ name: "password", label: "Mot de passe", type: "text" }],
          ]}
          secondBtn="Annuler"
          secondBtnStyle="minimal"
          secondBtnOnClick={() => navigate("/AdminIT/gerer_les_membres")}
        />
        <Footer />
      </div>
    </div>
  );
}
