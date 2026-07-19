import style from "./InfoMembre.module.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Titre from "../components/Titre";
import Footer from "../components/Footer";
import FormModule from "../components/FormModule";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InfoMembre() {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [fonctions, setFonctions] = useState([]);
  const [structures, setStructures] = useState([]);

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/${userName}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userName]);

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

  if (!userDetails) {
    return <div>Loading...</div>;
  }

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
        <Titre titre="Informations d'un Membre" searchbar={false} />

        <FormModule
          inputs={[
            [
              {
                name: "nom",
                label: "Nom",
                type: "text",
                value: userDetails.nom,
              },
              {
                name: "prenom",
                label: "Prénom",
                type: "text",
                value: userDetails.prenom,
              },
            ],
            [
              {
                name: "fonction",
                label: "Fonction",
                type: "select",
                optionsType: "fonctions",
                options: fonctions,
                value: userDetails.fonction,
              },
              {
                name: "nom_structure",
                label: "Structure",
                type: "select",
                optionsType: "structures",
                options: structures,
                value: userDetails.nom_structure,
                valueID: userDetails.structureID,
              },
            ],
            [
              {
                name: "email",
                label: "Email",
                type: "email",
                value: userDetails.email,
              },
            ],
            [
              {
                name: "password",
                label: "Mot de passe",
                type: "text",
                value: userDetails.password,
              },
            ],
          ]}
          secondBtn="Annuler"
          secondBtnStyle="minimal"
          secondBtnOnClick={() =>
            navigate(
              `/AdminIT/gerer_les_membres/informations_d'un_membre/${userName}`
            )
          }
        />

        <Footer />
      </div>
    </div>
  );
}
